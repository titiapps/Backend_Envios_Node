const express = require("express");
const MovimientosController = require("../../controllers/envios/movimientos");

const router = express.Router();

router.get(
  "/buscarMovimiento/:id_movimiento",
  MovimientosController.regresarInformacionMovimiento
);
//este endpoint devuelte todo lo que haya hecho un usuario con ese numero de id
router.get("/movimientousuario/:id", MovimientosController.usuarioMovimientos);

router.post("/movimientosFecha", MovimientosController.movimientosFecha);

module.exports = router;
