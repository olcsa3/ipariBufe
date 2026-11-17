const express = require('express');
const pool = require('./config/db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A Büfé API szerver fut!');
});

app.get('/api/products', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM products'); 
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Hiba a termékek lekérésekor" });
    } finally {
        if (conn) conn.release();
    }
});

app.post('/api/register', async (req, res) => {
    const { firstName, surname, email, password } = req.body;

    if (!firstName || !surname || !email || !password) {
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
    }

    const validFirstName = firstName.trim();
    const validSurname = surname.trim();

    let conn;
    try {
        conn = await pool.getConnection();

        const existingUsers = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "Ezzel az e-mail címmel már regisztráltak!" });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const result = await conn.query(
            'INSERT INTO users (surname, first_name, email, password_hash) VALUES (?, ?, ?, ?)',
            [validSurname, validFirstName, email, passwordHash]
        );

        const newUserId = Number(result.insertId);

        const token = jwt.sign(
            { id: newUserId, email: email, role_id: null },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Sikeres regisztráció!",
            token,
            user: {
                id: newUserId,
                surname: validSurname,
                first_name: validFirstName,
                email: email,
                role_id: null
            }
        })
    } catch (err) {
        console.error("Regisztrációs hiba:", err);
        res.status(500).json({ error: "Szerverhiba történt a regisztráció során." });
    } finally {
        if (conn) conn.release();
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Az e-mail cím és a jelszó megadása kötelező!" });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const users = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Hibás e-mail cím vagy jelszó!" });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid) {
            return res.status(401).json({ error: "Hibás e-mail cím vagy jelszó!" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role_id: user.role_id
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.json({
            message: "Sikeres bejelentkezés!",
            token,
            user: {
                id: user.id,
                surname: user.surname,
                first_name: user.first_name,
                email: user.email,
                role_id: user.role_id
            }
        })
    } catch (err) {
        console.error("Bejelentkezési hiba:", err);
        res.status(500).json({ error: "Szerverhiba történt a bejelentkezés során." });
    } finally {
        if (conn) conn.release();
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Szerver elindult a ${PORT}-es porton.`);
});