/*******************************
 * Hospitales
 * api/medicos
 *******************************/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medicos");

const router = Router();

// Ruta para obtener todos los usuario
router.get("/", getMedicos);

//Ruta para crear usuario
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
    //Validavion de id mongo .isMongoId(),
    check("hospital", "El hospital id debe ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

//Ruta para Actualizar usuarios
router.put( "/:id",
[
  validarJWT,
  check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
  //Validavion de id mongo .isMongoId(),
  check("hospital", "El hospital id debe ser valido").isMongoId(),
  validarCampos,
],
  actualizarMedico
);

// ruta para borrar usuario
router.delete("/:id", validarJWT,borrarMedico);

module.exports = router;
