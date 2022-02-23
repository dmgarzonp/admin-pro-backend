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


//Base de Datos de Datos 
conectionDB();



//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en puerto.." + process.env.PORT);
})

//uusario Mongo DB 
//usurio:  main_user
//clave: GrvWOYVMAYFp9UAX