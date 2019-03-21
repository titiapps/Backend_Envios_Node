let Direccion = require("../../models/direccion"); //modelo de Direccion

exports.pago_envio = (req, res) => {
  let { origen, destino } = req.body;

  let id_origen = "";
  let id_destino = "";

  let nuevaDireccionOrigen = new Direccion(origen);

  nuevaDireccionOrigen.save((err, origen_respuesta) => {
    if (err) {
      return res.send({ err: err });
    }
    return res.send({ mensaje: "prueba", origen, destino, origen_respuesta });
  });
};
