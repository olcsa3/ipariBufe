const express = require('express');
const pool = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A Büfé API szerver fut!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Szerver elindult a ${PORT}-es porton.`);
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