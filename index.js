/******************
 * Punto inicial de nuesto backend
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {conectionDB} = require('./database/config')

//Crear el servidor de express
const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


//Base de Datos de Datos 
conectionDB();



//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));




app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto.." + process.env.PORT);
})

//uusario Mongo DB 
//usurio:  main_user
//clave: GrvWOYVMAYFp9UAX