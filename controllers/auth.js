const { response } =  require('express');
const  Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const login = async(req, res = response ) => {

    const {email, password} = req.body;

    try {

        // Verificar Email
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña no valida'
            })
        }
        
        //Generar un token - JWT
        const token = await generarJWT( usuarioDB.id)


        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error inesperado consulte con administrador"
        })
    }
}

module.exports = {
    login
}