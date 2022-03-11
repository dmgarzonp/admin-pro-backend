/***************************
 * Modelo usuario
 ****************************/

 const { Schema, model } = require('mongoose');


 const HospitalSchema = Schema({
     nombre: {
         type: String,
         required: true
     },    
     img: {
         type: String,        
     },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
 },{ collection: 'hospitales'});
 
 // para cambiar la referencia de _id por uid es solo visual no afecta la BD
 HospitalSchema.method('toJSON', function() {
     const { __v, ...object } = this.toObject();
    
     return object;
 })
 
 module.exports = model('Hospital',HospitalSchema);