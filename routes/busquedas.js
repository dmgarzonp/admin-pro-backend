/*******************************
 * RUTA: /api/todo/
 *******************************/

const { Router } = require("express");
const router = Router();

const { validarJWT } = require("../middlewares/validar-jwt")

const { getBuscarTodo, getBuscarDocumentosColeccion } = require("../controllers/busquedas")

router.get('/:busqueda', validarJWT, getBuscarTodo)
router.get('/coleccion/:tabla/:busqueda', validarJWT, getBuscarDocumentosColeccion)









module.exports = router;

