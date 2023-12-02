const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema  = new Schema({
    id: Number,
    nombre: String,
    apellido: String,
    empleado: Boolean,
    id_empleado: Number,
    plan: {
        descripcion: String,
        canales: [String],
        precio: Number
    },
    localizacion: {
        localidad: String,
        codigo_postal: String,
        geolocalizacion: [Schema.Types.Mixed]
    },
    tickets: [Schema.Types.Mixed]
}); 

usuarioSchema.index({"localizacion.geolocalizacion": "2dsphere"});
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;