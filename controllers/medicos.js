const { response } = require('express');

//Importar el modelo
const Medico = require('../models/medico');


//Para obtener una lista de Medicos Con el usuario y el hospital que pertenece
const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                    .populate('usuario','nombre img')
                    .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    })
}


const crearMedico = async(req, res = response) => {

    //Obtener el id del medicos
    const uid = req.uid;

    //Crear la instacia de medicos
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })


try {
    

    //Guardar el medicos
    const medicoDB = await medico.save();



    res.json({
        ok: true,
       medico: medicoDB
    });


} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: "Error grave comuniquese con el administrador",
    });
    
}

}


const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar medico'
    })
}

const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar medico'
    })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}