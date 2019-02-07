const express = require("express");

const routes = express.Router();

const ControllerUsuario = require("../controllers/usuarios");

routes.get("/usuario", ControllerUsuario.pruebausuarios);

module.exports = routes;
