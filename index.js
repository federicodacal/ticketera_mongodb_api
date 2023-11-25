const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.URI);

app.get('/api/tickets', async (req, res) => {
    try {
        
        const database = client.db('sample_airbnb');
        const movies = database.collection('listingsAndReviews');
        
        const data = await movies.find().limit(2).toArray();

        return res.status(200).json({
            data
        })
    }
    catch(err) {
        return res.status(404).json({
            msg: err.message
        })
    }
    finally {
        await client.close()
    }
})

app.listen(8080, () => {
    console.log('Server running on port 8080');
})

