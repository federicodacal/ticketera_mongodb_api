const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");

require('dotenv').config();

app.use(cors());

const TicketModel = require('./models/ticketModel');

app.get('/api/tickets', async (req, res) => {
    try {
        
        /*
        const tickets = await TicketModel.find({
            msg: {
                $type: "string"
            }
        });*/

        return res.status(200).json({
            msg: "Hola"
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

