const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");

require('dotenv').config();

//const { MongoClient } = require("mongodb");
//const client = new MongoClient(process.env.URI);

app.use(cors());

const Ticket = require('./models/ticketModel');

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

app.listen(8080, () => {
    console.log('Server running on port 8080');
})

