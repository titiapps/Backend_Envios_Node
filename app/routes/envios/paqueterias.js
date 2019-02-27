const express = require("express");
const PaqueteriasController = require("../../controllers/envios/paqueterias");

const router = express.Router();

router.post("/cotizaEnvio", PaqueteriasController.cotizacion);

module.exports = router;
