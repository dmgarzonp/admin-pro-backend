/*******************************
 * Hospitales
 * /api/hospitales
 *******************************/

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospitales");

const router = Router();

// Ruta para obtener todos los usuario
router.get("/", getHospitales);

//Ruta para crear usuario
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

//Ruta para Actualizar usuarios
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  actualizarHospital
);

// ruta para borrar usuario
router.delete("/:id", validarJWT, borrarHospital);

module.exports = router;
