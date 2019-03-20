const express = require("express");

const routes = express.Router();

const PagosController = require("../../controllers/pagos/pagos");
const MiddlewareAutorizacion = require("../../middlewares/autorizacion");

routes.post(
  "/pagarconekta",
  MiddlewareAutorizacion.verificarToken,
  PagosController.pagarconekta
);

module.exports = routes;
