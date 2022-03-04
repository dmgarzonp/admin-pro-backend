
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const res = require('express/lib/response');
const { generarJWT } = require('../helpers/jwt');


//Controlador para obtener todos los usuarios
const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find( {}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios        
    });
}


// Controlador para crear nuevos usuarios
const crearUsuario = async (req, res = response ) => {
    const {email, password, nombre} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }

        const usuario = new Usuario( req.body);

        //encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar un token - JWT
        const token = await generarJWT( usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...revisar logs'
        })
    }

    
}

//Controlador para actualizar usuarios
const actualizarUsuario = async ( req, res = response) => {

     //TODO: validar token y comprobar si es el usuario correcto



    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById( uid );
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese ID'
            });            
        }

        //Actualizaciones
        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                })
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true});        
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inisperado'
        })
    }
}

//Controlador para borra usuario
const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById( uid );
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese ID'
            });            
        }

        await Usuario.findByIdAndDelete( uid );
        res.json({
            ok: true,
            msg: 'usuario eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mdg: 'error inesperado al borrar. Hable con el administrador'

        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}