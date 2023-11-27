const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

const TicketSchema = new Schema({
    cliente: {
        id: Number,
        nombre: String,
        apellido: String,
        empleado: Boolean
    },
    id_tramite: String,    
    fecha: Date,
    responsable: [
        {
            nombre: String,
            apellido: String,
            id_empleado: Number,
            departamento: String
        }
    ],
    despertectos: [String],
    tipo: String,
    resuelto: Boolean,
    operaciones: [String]
});