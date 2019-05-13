const express = require("express");

const routes = express.Router();

const ControllerUsuario = require("../controllers/usuarios/usuarios");
const ControllerRecovery = require("../controllers/usuarios/recuperacion");
const middlewareAutorizacion = require("../middlewares/autorizacion");
const middlewareEmail = require("../middlewares/emailChecker");

//Devolucion de todos los usuarios dados de alta en el sistema
routes.get("/usuarios", ControllerUsuario.getUsuarios); //Regresa todos los usuarios
routes.get("/usuario/:id", ControllerUsuario.getUsuario); //Regresa unicamente el perfil del usuario
routes.post("/usuario", ControllerUsuario.crearUsuario); //Nos permite la creación de usuarios
routes.post(
    "/usuario/recovery",
    middlewareEmail.checkEmail,
    ControllerRecovery.recupera);
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


module.exports = routes;
