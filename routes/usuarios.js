/****************************************************************
 * RUTA: /api/uausrios
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require("../controllers/usuarios");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Ruta para obtener todos los usuario
router.get("/", validarJWT, getUsuarios);

//Ruta para crear usuario
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatoprio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);



//Ruta para Actualizar usuarios
router.put("/:id", 
[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),    
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
], 
actualizarUsuario
);

// ruta para borrar usuario
router.delete("/:id", validarJWT ,borrarUsuario);

module.exports = router;
