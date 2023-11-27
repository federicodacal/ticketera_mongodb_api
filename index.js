const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");

require('dotenv').config();

app.use(cors());

const connectDB = require('./connectMongo');

connectDB();

const Ticket = require('./models/ticketModel');
const Hola = require('./models/holaModel');

// GET: Traer tickets
app.get('/api/tickets', async (req, res) => {
    try {
        
        const tickets = await Ticket.find();

        return res.status(200).json({
            tickets
        })
    }
    catch(err) {
        return res.status(404).json({
            msg: err.message
        })
    }
})

app.get('/api/hola', async (req, res) => {
    try {
        
        const hola = await Hola.find();

        return res.status(200).json({
            hola
        })
    }
    catch(err) {
        return res.status(404).json({
            msg: err.message
        })
    }
})

app.listen(8080, () => {
    console.log('Server running on port 8080');
})

