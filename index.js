const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URI);

app.get('/', async (req, res) => {
    return res.status(200).json({
        "OK": "ok"
    })
})

app.get('/api/tickets', async (req, res) => {
    try {
        
        const db = client.db('ticketera');
        const tickets = db.collection('tickets');
        
        const data = await tickets.find().toArray();

        return res.status(200).json({
            data
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

