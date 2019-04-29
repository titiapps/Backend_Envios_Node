const express = require("express");
const PaqueteriasController = require("../../controllers/envios/paqueterias");
const PagoEnvioController = require("../../controllers/envios/pago_envio");
const MiddlewareAutorizacion = require("../../middlewares/autorizacion");

const router = express.Router();

router.post("/cotizaEnvio",MiddlewareAutorizacion.verificarToken, PaqueteriasController.cotizacion);

router.get("/verificarDireccion", PaqueteriasController.verificarDireccion);
router.post(
  "/pagoEnvio",
  MiddlewareAutorizacion.verificarToken,
  PagoEnvioController.pago_envio
);
router.post("/comprarEtiqueta", PaqueteriasController.comprarEtiqueta);
router.post(
  "/guardarMovimientoEtiqueta",
  PagoEnvioController.guardarMovimiento_Etiqueta
);

module.exports = router;
