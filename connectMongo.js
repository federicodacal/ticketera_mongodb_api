const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected');
    }
    catch (err) {
        console.log('Failed to connect ' + err.message);
    }
}

module.exports = connectDB;