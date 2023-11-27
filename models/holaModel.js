const mongoose = require('mongoose');
const { Schema } = mongoose;

const holaSchema  = new Schema({
    nombre: String,
    apellido: String,
    datos: {
        dato: Number,
        cosas: [Number],
        dia: Date
    }
}); 

const Hola = mongoose.model('Hola', holaSchema);
module.exports = Hola;