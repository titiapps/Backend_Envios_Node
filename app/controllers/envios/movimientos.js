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
    .then(movimientos_enviar => {
      let movimientos = movimientos_enviar;

      for (let i = 0; i < movimientos.length; i++) {
        movimientos[i].envio.paquete_longitud = Math.round(
          movimientos[i].envio.paquete_longitud * 2.54
        );
        movimientos[i].envio.paquete_anchura = Math.round(
          movimientos[i].envio.paquete_anchura * 2.54
        );
        movimientos[i].envio.paquete_altura = Math.round(
          movimientos[i].envio.paquete_altura * 2.54
        );
        movimientos[i].envio.paquete_peso = Math.round(
          movimientos[i].envio.paquete_peso / 0.035274
        );
      }

      return res.status(200).send(movimientos);
    })
    .catch(err => {
      return res.status(400).send(err);
    });
};
//este se usa para darle un reporte a josafad
exports.movimientosFecha = (req, res) => {
  let { fecha_inicio, fecha_fin } = req.body;
  console.log("fecha_inicio", fecha_inicio);
  console.log("fecha_fin", fecha_fin);
  Movimiento.find(
    {
      fecha_movimiento: {
        $gte: fecha_inicio,
        $lt: fecha_fin
      }
    },
    "fecha_movimiento num_guia etiqueta_pdf"
  )
    .populate(
      "usuario",
      "nombre apellido_paterno apellido_materno email telefono"
    )
    .populate("pago", "forma_pago monto")
    .populate(
      "envio",
      "o_destino o_origen paquete_altura paquete_anchura paquete_longitud paquete_peso paqueteria servicio"
    )
    .exec((err, movimientos_temp) => {
      Envio.populate(
        movimientos_temp,
        [
          { path: "envio.o_origen", model: "direccion" },
          { path: "envio.o_destino", model: "direccion" }
        ],
        (error_dir, movimientos_enviar) => {
          if (!movimientos_enviar) {
            return res.send([]);
          }
          if (error_dir) {
            return res.send({ error_dir });
          }

          if (movimientos_enviar) {
            let movimientos = movimientos_enviar;
            for (let i = 0; i < movimientos.length; i++) {
              movimientos[i].envio.paquete_longitud = Math.round(
                movimientos[i].envio.paquete_longitud * 2.54
              );
              movimientos[i].envio.paquete_anchura = Math.round(
                movimientos[i].envio.paquete_anchura * 2.54
              );
              movimientos[i].envio.paquete_altura = Math.round(
                movimientos[i].envio.paquete_altura * 2.54
              );
              movimientos[i].envio.paquete_peso = Math.round(
                movimientos[i].envio.paquete_peso / 0.035274
              );
            }
            return res.send({ movimientos });
          }
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
