let Direccion = require("../../models/direccion"); //modelo de Direccion

exports.pago_envio = (req, res) => {
  let { origen, destino } = req.body;

  let id_origen = "";
  let id_destino = "";

  let nuevaDireccionOrigen = new Direccion(origen);
  let nuevaDireccionDestino = new Direccion(destino);
  nuevaDireccionOrigen.save((err, origen_respuesta) => {
    if (err) {
      return res.send({ err, mensaje: "Error en el origen" });
    }
    id_origen = origen_respuesta.id;
  });

  nuevaDireccionDestino.save((err, destino_respuesta) => {
    if (err) {
      return res.send({ err, mensaje: "Error en el destino" });
    }
    id_destino = destino_respuesta.id;
    return res.send({ id_origen, destino_respuesta });
  });
};
