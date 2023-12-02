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
const { trusted } = require('mongoose');

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
app.get('/api/ticketsResueltos', async (req, res) => {
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
app.get('/api/ticketsNoResueltos', async (req, res) => {
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
app.get('/api/ticketsFechaGte', async (req, res) => {
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

// Operador $in -> Tickets con tipo Alta o Cambio de Plan
app.get('/api/ticketsTipoIn', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            tipo: { $in: ["Alta", "Cambio de plan"] }
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

// Operador $nin -> Usuarios NO en Avellaneda y Quilmes
app.get('/api/usuarioLocalidadNin', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "localizacion.localidad": { $nin: ["Avellaneda", "Quilmes"] }
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

// Operador $or -> Tickets con tipo "Desperfecto" o "Cambio de plan"
app.get('/api/ticketsTipoOr', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            $or: [ {tipo: "Desperfecto"}, {tipo: "Cambio de plan"} ] 
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

// Operador $and -> Tickets con tipo "Desperfecto" y localidad Avellaneda
app.get('/api/ticketsTipoAnd', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            $and: [ {tipo: "Desperfecto"}, {"cliente.localizacion.localidad": "Avellaneda"} ] 
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

// Operador $nor -> Tickets NO de Avellaneda y NO resuelto 
app.get('/api/ticketsNor', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            $nor: [ {resuelto: true}, {"cliente.localizacion.localidad": "Avellaneda"} ] 
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

// Operador $not -> Tickets que NO tienen "Baja" en operaciones
app.get('/api/ticketsNotBaja', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            operaciones: { $not: { $eq: "Baja" } }
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

// Operador $text, $search -> Usuarios con nombre "Juan"
app.get('/api/usuariosJuan', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            $text: { $search: "Juan" }
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

// Operador $near -> Usuarios cerca de UTN-FRA 
app.get('/api/near', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "localizacion.geolocalizacion": {
                $near: {
                    $geometry: { 
                        type: "Point",
                        coordinates: [
                            -58.36474503826432,
                            -34.66253120682271
                        ] 
                    },
                    $minDistance: 1,
                    $maxDistance: 5000
                }
            }
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

// Operador $geoWithin -> Localidad de Avellenada y cercanos
app.get('/api/geoWithin', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "localizacion.geolocalizacion": {
                $geoWithin: {
                    $geometry: { 
                        type: "Polygon",
                        coordinates: [
                            [
                              [
                                -58.36675657102998,
                                -34.65315188615764
                              ],
                              [
                                -58.372576737477175,
                                -34.658093904185336
                              ],
                              [
                                -58.381025366191025,
                                -34.66890354122316
                              ],
                              [
                                -58.39247795178092,
                                -34.70209575032251
                              ],
                              [
                                -58.351736786649525,
                                -34.71058464279308
                              ],
                              [
                                -58.312122105347015,
                                -34.690981701889214
                              ],
                              [
                                -58.35474074352561,
                                -34.64666504031982
                              ],
                              [
                                -58.36675657102998,
                                -34.65315188615764
                              ]
                            ]
                        ] 
                    }
                }
            }
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

// Operador $geoIntersect -> Usuarios frente Plaza Alsina
app.get('/api/geoIntersects', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "localizacion.geolocalizacion": {
                $geoIntersects: {
                    $geometry: { 
                        type: "Polygon",
                        coordinates: [
                            [
                                [
                                  -58.36524304134903,
                                  -34.66208885232607
                                ],
                                [
                                  -58.36524304134903,
                                  -34.662906760155096
                                ],
                                [
                                  -58.36434065271186,
                                  -34.662906760155096
                                ],
                                [
                                  -58.36434065271186,
                                  -34.66208885232607
                                ],
                                [
                                  -58.36524304134903,
                                  -34.66208885232607
                                ]
                              ]
                          ],
                    }
                }
            }
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

// Operador $exists -> Tickets que tiene descripcion de desperfecto
app.get('/api/ticketDesperfecto', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            "desperfectos.descripcion": { $exists: true, $ne: "" }
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

// Operador $type -> codigo postal tipo string
app.get('/api/type', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "localizacion.codigo_postal": { $type: "string" }
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

// Operador $all -> Usuarios con canales "ESPN" y "ESPN 2"
app.get('/api/canalesAll', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "plan.canales": { $all: [ "ESPN", "ESPN 2"] }
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

// Operador $elemMatch -> Tickets con responsable de Service
app.get('/api/ticketsService', async (req, res) => {
    try {
        
        const tickets = await Ticket.find({
            responsable: {
              $elemMatch: {
                "departamento": "Service"
              }
            }
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

// Operador $size -> Usuarios con plan de más de 6 canales
app.get('/api/canalesSize', async (req, res) => {
    try {
        
        const users = await Usuario.find({
            "plan.canales": { $gt: { $size: 6 } }
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

// Operador $sortByCount, $unwind, $match -> Canales de Pack Deportes
app.get('/api/canalesDeportes', async (req, res) => {
    try {
        
        const canales = await Usuario.aggregate([
            {
                $match: {
                    "plan.descripcion": "Deportes"
                }
            },
            {
                $unwind: {
                    path: "$plan.canales"
                }
            },
            {
                $sortByCount: "$plan.canales"
            }
        ])

        return res.status(200).json({
            canales
        })
    }
    catch(err) {
        return res.status(404).json({
            msg: err.message
        })
    }
})

// Operadores $project, $unwind, $match, $group -> Desperfectos por tipo, localidad y cantidad
app.get('/api/desperfectos', async (req, res) => {
    try {
        
        const data = await Ticket.aggregate([
            {
                $unwind: "$desperfectos" 
            },
            {
                $group: {
                    _id: "$desperfectos.descripcion",
                    lugares: { $addToSet: "$cliente.localizacion.localidad" },
                    ocurrencias: { $sum: 1 } 
                }
            },
            {
                $project: {
                    desperfecto: "$_id",
                    lugares: 1,
                    ocurrencias: 1,
                    _id: 0
                }
            }
        ])

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

// $lookup, $unwind, $match, $project -> Clientes que son empleados
app.get('/api/clientesEmpleados', async (req, res) => {
    try {
        
        const data = await Ticket.aggregate([
            {
                $lookup: {
                    from: "usuarios",
                    localField: "cliente.apellido",
                    foreignField: "apellido",
                    as: "clienteData"
                }
            },
            {
                $unwind: {
                    path: "$clienteData"
                }
            }, 
            {
                $match: {
                    "clienteData.empleado": true
                }
            }, 
            {
                $project: {
                    "nombre_cl": "$clienteData.nombre",
                    "apellido_cl": "$clienteData.apellido",
                    "id_cl": "$clienteData.id",
                    "_id": 0
                }
            }
        ])

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

// Operador $expr -> Usuarios con más de 2 tickets
app.get('/api/userExpr', async (req, res) => {
    try {
        
        const data = await Usuario.find({
            $expr: {
                $gt: [ { $size: "$tickets" }, 2 ]
            }
        })

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

// Operadores $unwind, $group, $project -> Ocurreciones por empleado
app.get('/api/empleados', async (req, res) => {
    try {
        
        const data = await Ticket.aggregate([
            {
                $unwind: "$responsable" 
            },
            {
                $group: {
                    _id: "$responsable.id_empleado",
                    ocurrencias: { $sum: 1 } 
                }
            },
            {
                $project: {
                    id: "$_id",
                    ocurrencias: 1,
                    _id: 0
                }
            }
        ])

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

