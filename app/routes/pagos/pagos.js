const express = require("express");

const routes = express.Router();

const PagosController = require("../../controllers/pagos/pagos");

routes.get("/pagarconekta", PagosController.pagarconekta);

module.exports = routes;
