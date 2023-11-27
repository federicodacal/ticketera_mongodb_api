const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema  = new Schema({
    cliente: {
        id: Number,
        nombre: String,
        apellido: String,
        empleado: Boolean,
        plan: {
            descripcion: String,
            canales: [String],
            precio: Number
        },
        localizacion: {
            localidad: String,
            codigo_postal: String,
            geolocalizacion: [Schema.Types.Mixed]
        }
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
    desperfectos: [String],
    tipo: String,
    resuelto: Boolean,
    operaciones: [String]
}); 

ticketSchema.index({localizacion: "2dsphere"});
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;