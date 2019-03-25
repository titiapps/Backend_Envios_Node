const express = require("express");
const PaqueteriasController = require("../../controllers/envios/paqueterias");
const PagoEnvioController = require("../../controllers/envios/pago_envio");
const MiddlewareAutorizacion = require("../../middlewares/autorizacion");

const router = express.Router();

router.post("/cotizaEnvio", PaqueteriasController.cotizacion);
router.post("/generaCompra", PaqueteriasController.comprar);
router.get("/verificarDireccion", PaqueteriasController.verificarDireccion);
router.post(
  "/pagoEnvio",
  MiddlewareAutorizacion.verificarToken,
  PagoEnvioController.pago_envio
);

module.exports = router;
