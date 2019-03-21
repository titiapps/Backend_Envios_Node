let Direccion = require("../../models/direccion"); //modelo de Direccion

exports.pago_envio = (req, res) => {
  let body = req.body;
  let id_origen = "";
  let id_destino = "";s

  let nuevaDireccionOrigen = new Direccion({
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    telefono,
    password,
    activo
  });
  

  return res.send({ mensaje: "prueba", body });
};
