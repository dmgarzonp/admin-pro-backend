/****************************************************************
 * ARCHIVO DE CONEXION A LA BASE DE DATOS MONGO
**************************************************************** */

const mongoose = require('mongoose');



const conectionDB = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
             useNewUrlParser: true,
             useUnifiedTopology: true            
         });
         console.log('BD ONLINE');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar base de datos ver logs')
    }
}

module.exports = {
    conectionDB
}
