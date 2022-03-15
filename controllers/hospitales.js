const { response } = require("express");

const Hospital = require("../models/hospital");


//Obtener lista de Hospitales 
const getHospitales = async(req, res = response) => {

  //obtener hospitales 
const hospitales = await Hospital.find()                            
             .populate('usuario','nombre img');//para obtener en la liista el nombre de quien cro el hospital

  res.json({
    ok: true,
    hospitales
  });
};


//Crear un nuebo hospital en DB
const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error grave comuniquese con el administrador",
    });
  }
};


// Actualizar hospita
const actualizarHospital = async (req, res = response) => {

  const id = req.params.id;
  const uid = req.uid;

  try {

    const hospital = await Hospital.findById( id );

    if (!hospital) {      
      return res.status(404).json({
        ok: true,
        msg: "Hospital no encontrado por ID",
       
      });
    }
    

    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true});

    res.json({
      ok: true,      
      hospital: hospitalActualizado
    });
    
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contactese con el administrador'
    })
  }
 
};

//Borrar Hospital
const borrarHospital = async (req, res = response) => {

  const id = req.params.id;  

  try {

    const hospital = await Hospital.findById( id );

    if (!hospital) {      
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado por ID",
       
      });
    }
    
    await Hospital.findByIdAndDelete( id );    

    res.json({
      ok: true,      
      msg: 'hospital eliminado'
    });
    
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contactese con el administrador'
    })
  }
};



// Exportar Modulos
module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
