/* AQUI ESTAN LAS RUTAS PARA PODER AUTENTICAR Y REGRESAR EL TOKEN */

const express = require("express");

const routes = express.Router();

const AutorizacionController = require("../controllers/autorizacion");

routes.post("/login", AutorizacionController.login);

module.exports = routes;
