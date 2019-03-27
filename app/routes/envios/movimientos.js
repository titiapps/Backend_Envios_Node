const express = require("express");
const MovimientosController = require("../../controllers/envios/movimientos");

const router = express.Router();

router.get(
  "/buscarMovimiento/:id_movimiento",
  MovimientosController.regresarInformacionMovimiento
);
router.get(
  "/buscarUsuarioMovimiento/:id_usuario",
  MovimientosController.regresarUsuarioInfoPrueba
);

module.exports = router;
