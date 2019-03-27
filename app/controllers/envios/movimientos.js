let Movimiento = require("../../models/movimiento");

exports.regresarInformacionMovimiento = (req, res) => {
  let { id_movimiento } = req.params;

  Movimiento.findOne({ _id: id_movimiento })
    .populate("usuario")
    .populate("envio")
    .populate("pago")
    .exec((err, res_movimiento) => {
      return res.send({ res_movimiento });
    });
};

exports.regresarUsuarioInfoPrueba = (req, res) => {
  let { id_usuario } = req.params;
  Movimiento.find({ usuario: id_usuario })
  .exec((err, res_usuario_movimiento) => {
    return res.send({ res_usuario_movimiento });
  });
};
