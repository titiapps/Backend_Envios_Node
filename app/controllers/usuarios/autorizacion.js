let Usuario = require("../../models/usuario");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

//Este metodo nos permite verificar si el usuario que se esta intentando loguear sus credenciales
//son correctas  o no
exports.login = (req, res) => {
  let { email, password } = req.body;

  Usuario.findOne({ email }, (err, usuario_bus) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        mensaje: "Error al poder verificar por usuarios",
        img_status: "https://http.cat/500"
      });
    }
    if (!usuario_bus) {
      return res.status(400).send({
        ok: false,
        mensaje: "Credenciales Incorrectas - email",
        error: err,
        img_status: "https://http.cat/400"
      });
    }

    if (!bcrypt.compareSync(password, usuario_bus.password)) {
      return res.status(400).send({
        ok: false,
        mensaje: "Credenciales Incorrectas -password",
        img_status: "https://http.cat/400"
      });
    }

    let token = jwt.sign({ usuario: usuario_bus }, process.env.SEED, {
      expiresIn: 14400
    });

    usuario_bus.password = "-----------";

    return res.status(200).send({
      token,
      id: usuario_bus._id,
      usuario: usuario_bus,
      img_status: "https://http.cat/202",
    /*   menu: obtenerMenu(usuario_bus.rol) */
    });
  });
};

//ESTE METODO NOS PERMITE RENOVAR EL TOKEN

exports.renovarToken = (req, res) => {
  let token = jwt.sign(
    { usuario: req.usuario_token_correcto },
    process.env.SEED,
    {
      expiresIn: 14400
    }
  );
  return res.status(202).send({
    token,
    id: req.usuario_token_correcto._id,
    usuario: req.usuario_token_correcto,
    img_status: "https://http.cat/202"
  });
};
