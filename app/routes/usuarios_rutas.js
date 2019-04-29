const express = require("express");

const routes = express.Router();

const ControllerUsuario = require("../controllers/usuarios/usuarios");
const middlewareAutorizacion = require("../middlewares/autorizacion");

//Devolucion de todos los usuarios dados de alta en el sistema
routes.get("/usuarios", ControllerUsuario.getUsuarios); //Regresa todos los usuarios
routes.get("/usuario/:id", ControllerUsuario.getUsuario); //Regresa unicamente el perfil del usuario
routes.post("/usuario", ControllerUsuario.crearUsuario); //Nos permite la creación de usuarios
routes.delete(
  "/usuario/:id",
  middlewareAutorizacion.verificarToken,
  middlewareAutorizacion.verificarRoloUsuario,
  ControllerUsuario.eliminarUsuario
); //Esta es la ruta para eliminar usuario
routes.put(
  "/usuario/:id",
  middlewareAutorizacion.verificarToken,
  middlewareAutorizacion.verificarRoloUsuario,
  ControllerUsuario.actualizarUsuario
);
routes.get("/movimientousuario/:id",ControllerUsuario.usuarioMovimientos);
/* RUTAS PARA PRUEBAS DE LOS MOVIMIENTOS QUE SE ESTAN TENIENDO DENTRO DEL SISTEMA */


module.exports = routes;
