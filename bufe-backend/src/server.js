const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const products = require('./routes/productsSite');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('A Büfé API szerver fut!');
});

app.use('/api', authRoutes);
app.use('/api', products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Szerver elindult a ${PORT}-es porton.`);
});