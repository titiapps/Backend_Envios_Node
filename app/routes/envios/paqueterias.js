const express = require("express");
const PaqueteriasController = require("../../controllers/envios/paqueterias");

const router = express.Router();

router.post("/cotizaEnvio", PaqueteriasController.cotizacion);
router.post("/generaCompra", PaqueteriasController.comprar);
router.get("/verificarDireccion",PaqueteriasController.verificarDireccion);

module.exports = router;
