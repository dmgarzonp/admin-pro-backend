const { response } =  require('express');
const  Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const res = require('express/lib/response');
const { googleVerify } = require('../helpers/google-verify');



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

const googleSignIn = async( req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        //Verificar usuario 
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            //si NO existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@',
                img: picture,
                google: true
            })
        } else {
            // existe el usuarioDB
            usuario = usuarioDB;
            usuario.google = true;
        }
        
        //Guardar en base de datos ver
        await usuario.save();

         //Generar un token - JWT
         const token = await generarJWT( usuarioDB.id)


        res.json({
            ok: true,
            msg: 'Google Sign In',
            token
        })


    } catch (error) {
         res.json({
        ok: false,
        msg: 'Token no es correcto',       
    })
    }
}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    //Generar un token - JWT
    const token = await generarJWT( uid );

    // obtener usuario UID
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}