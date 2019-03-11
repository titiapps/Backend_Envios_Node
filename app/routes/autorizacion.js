/* AQUI ESTAN LAS RUTAS PARA PODER AUTENTICAR Y REGRESAR EL TOKEN */

const express = require("express");

const routes = express.Router();

const AutorizacionController = require("../controllers/usuarios/autorizacion");
const MiddlewareAutorizacion = require("../middlewares/autorizacion");

routes.post("/login", AutorizacionController.login);
routes.post(
  "/renovartoken",
  MiddlewareAutorizacion.verificarToken,
  AutorizacionController.renovarToken
);

module.exports = routes;
