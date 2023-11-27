const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");

require('dotenv').config();

app.use(cors());

const connectDB = require('./connectMongo');

connectDB();

const Ticket = require('./models/ticketModel');
const Usuario = require('./models/usuarioModel');

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

// GET: Traer usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        
        const users = await Usuario.find();

        return res.status(200).json({
            users
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

