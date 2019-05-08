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
//este se usa para darle un reporte a josafad
exports.movimientosFecha = (req, res) => {
  let { fecha_inicio, fecha_fin } = req.body;

  Movimiento.find({
    fecha_movimiento: {
      $gte: fecha_inicio,
      $lt: fecha_fin
    }
  })
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
          if (error_dir) {
            return res.send({ error_dir });
          }
          return res.send(respdi);
        }
      );
    });
};

//esta funcion nos trae los movimientos que se tiene hasta el momento
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
