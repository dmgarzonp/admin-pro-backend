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

const actualizarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizar hospital",
  });
};

const borrarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrar hospital",
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
