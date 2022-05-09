/****************************************************************
 * RUTA: /api/uausrios
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require("../controllers/usuarios");
const { 
  validarJWT, 
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario 
} = require("../middlewares/validar-jwt");

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
    validarADMIN_ROLE_o_MismoUsuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),    
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
], 
actualizarUsuario
);

// ruta para borrar usuario
router.delete("/:id", 
[validarJWT, validarADMIN_ROLE] ,
borrarUsuario);

module.exports = router;
