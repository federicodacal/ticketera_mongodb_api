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
app.get('/api/planMayor900', async (req, res) => {
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

// Operador $lt -> Usuarios con plan menor a $550
app.get('/api/planMenor550', async (req, res) => {
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

// Operador $lte -> Usuarios con plan menor o igual a $550
app.get('/api/planLte550', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "plan.precio": { $lte: 550 }
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

// Operador $gte -> Tickets con fecha mayor a 2017-12-12
app.get('/api/ticketFechaGte', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            fecha: { $gte: "2017-12-12T16:20:00.000+00:00" }
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

// Operador $in -> Tickets con fecha entre 2014-01-01 y 2017-12-12
app.get('/api/ticketFechaIn', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            fecha: { $in: ["2014-01-01T16:20:00.000+00:00", "2017-12-12T16:20:00.000+00:00"] }
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

// Operador $nin -> Tickets con fecha NO entre 2014-01-01 y 2017-12-12
app.get('/api/ticketFechaIn', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            fecha: { $nin: ["2014-01-01T16:20:00.000+00:00", "2017-12-12T16:20:00.000+00:00"] }
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

app.listen(8080, () => {
    console.log('Server running on port 8080');
})

