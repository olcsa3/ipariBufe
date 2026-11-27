const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/products', async (req, res) => {
    let conn;

    try {
        conn = await pool.getConnection();

        const products = await conn.query('SELECT id, name, description, price, category, stock, image_url FROM products');
        res.status(200).json(products);
    } catch (err) {
        console.error("Hiba a termékek lekérdezésekor: ", err);
        res.status(500).json({error: "Szerverhiba történt a kínálat lekérdezésekor."});
    } finally {
        if (conn) conn.release();
    }
})

module.exports = router;