const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  //validar TIPO
  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, hospita o usuario (tipo)",
    });
  }

  // validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  // procesar la imagen

  //Extraer la imagen
  const file = req.files.imagen;

  //Extraer la extension
  const nombreCortado = file.name.split(".");
  const extensioArchivo = nombreCortado[nombreCortado.length - 1];

  //Validar extesion
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensioArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extesion permitida",
    });
  }

  //Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensioArchivo}`;

  //Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //Mover la imagen
  file.mv(path, (err) => {
    if (err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error al mover la imagen'
        });
    } 

    //Actualizar base de Datos
    actualizarImagen(tipo, id, nombreArchivo)

    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
      });
  });

 
};


const retornaImagen = ( req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

  //Mostrar imagen por defecto

  if ( fs.existsSync(pathImg) ) {
    res.sendFile( pathImg );        
  } else {
    const pathImg = path.join(__dirname, `../uploads/no_imagen.jpg`);
    res.sendFile( pathImg ); 
  }

}
module.exports = {
  fileUpload,
  retornaImagen
};
