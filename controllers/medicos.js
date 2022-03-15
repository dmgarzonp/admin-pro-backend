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

// Para crear nuevo medico
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

// Para Actualizar medico
const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;



    try {

        //Buscar por id de medico
        const medico = await Medico.findById( id );

        //comprobar si el medico existe
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'medico no encontrado'
            })
        }

        //Los campos a ser cambiados
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        //Actualizar medico
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    };   
}


// Para Borra medico
const borrarMedico = async (req, res = response) => {

    const id = req.params.id;  

    try {
  
      const medico = await Medico.findById( id );
  
      if (!medico) {      
        return res.status(404).json({
          ok: false,
          msg: "Medico no encontrado por ID",
         
        });
      }
      
      await Medico.findByIdAndDelete( id );    
  
      res.json({
        ok: true,      
        msg: 'medico eliminado'
      });
      
     
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Contactese con el administrador'
      })
    }
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}