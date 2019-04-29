/* ================================================================= */
/* ======AQUI SE DEFINES LAS ACCIONES DE EL PERFIL DEL USUARIO,SUS PAGOS Y MOVIMIENTOS============== */
/* ================================================================= */

let Movimiento = require("../../models/movimiento");
let Envio = require("../../models/envio");

exports.regresarInformacionMovimiento = (req, res) => {
  let { id_movimiento } = req.params;

  Movimiento.findOne({ _id: id_movimiento }).exec((err, res_movimiento) => {
    return res.send({ res_movimiento });
  });
};

exports.usuarioMovimientos = (req, res) => {
  let { id } = req.params;
  traerMovimientos(id)
    .then(movimientos => {
      return res.status(200).send(movimientos);
    })
    .catch(err => {
      return res.status(400).send(err);
    });
};


function traerMovimientos(id) {
  return new Promise((resolve, reject) => {
    Movimiento.find({ usuario: id })
      .populate("pago")
      .populate("envio")
      .exec((err, movimientos) => {
        Envio.populate(
          movimientos,
          [
            { path: "envio.o_origen", model: "direccion" },
            { path: "envio.o_destino", model: "direccion" }
          ],
          (error_dir, respdi) => {
            resolve(respdi);
          }
        );
      });
  });
}
