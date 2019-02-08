/* ================================================================= */
/* ======AQUI SE DEFINES LAS ACCIONES DE LOS USUARIOS============== */
/* ================================================================= */

let Usuario = require("../models/usuario"); //modelo de Usuario
const bcrypt = require("bcryptjs");

//Esta funcion devuelve todos los usuarios que estan dados de alta en el sistema
exports.getUsuarios = (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  //DEVUELVE SOLO LOS CAMPOS QUE YO LE ESTOY INDICANDO
  Usuario.find({}, "nombre apellido_paterno apellido_materno email rol activo")
    .skip(desde)
    .limit(5)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(500).send({
          ok: false,
          mensaje: "Error Cargando Usuarios",
          errores: err
        });
      }
      Usuario.count({}, (err, conteo) => {
        if (err) {
          return res.status(500).send({
            ok: false,
            errores: err,
            mensaje: "Hubo un problema en el conteo de Usuarios en el sistema"
          });
        }
        return res
          .status(200)
          .send({ ok: true, usuarios: usuarios, total: conteo });
      });
    });
};
//Este metodo nos permite la creacion de Usuarios
exports.crearUsuario = (req, res) => {
  let {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    password
  } = req.body;

  password = bcrypt.hashSync(password, 10);
  let activo = true;

  let nuevoUsuario = new Usuario({
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    password,
    activo
  });

  nuevoUsuario.save((err, usuario) => {
    if (err) {
      return res.status(400).send({
        ok: true,
        mensaje: "Hubo un problema al dar de alta al usuario",
        errores: err
      });
    }
    return res
      .status(201)
      .send({ ok: true, usuario, mensaje: "Usuario creado de manera exitosa" });
  });
};

//funcion para eliminar usuario

exports.eliminarUsuario = (req, res) => {
  return res
    .status(200)
    .send({ mensaje: "ESTOY ENTRANDO A LA FUNCION DE ELIMINAR" });
};
