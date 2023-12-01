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

// Operador $eq -> Tickets resueltos
app.get('/api/tickets_resueltos', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            resuelto: true
        });

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

// Operador $ne -> Tickets no resueltos
app.get('/api/tickets_no_resueltos', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            resuelto: { $ne: true }
        });

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

// Operador $gt -> Usuarios con plan mayor a $900
app.get('/api/plan_mayor_a_900', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "plan.precio": { $gt: 900 }
        });

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

// Operador $lt -> Usuarios con plan menor a $900
app.get('/api/plan_menor_a_900', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "plan.precio": { $lt: 900 }
        });

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

// Operador $lt -> Usuarios con plan menor o igual a $550
app.get('/api/plan_lte_550', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "plan.precio": { $lt: 550 }
        });

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

