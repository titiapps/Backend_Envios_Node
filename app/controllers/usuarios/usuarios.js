/* ================================================================= */
/* ======AQUI SE DEFINES LAS ACCIONES DE LOS USUARIOS============== */
/* ================================================================= */

let Usuario = require("../../models/usuario"); //modelo de Usuario
const bcrypt = require("bcryptjs");

//Esta funcion devuelve todos los usuarios que estan dados de alta en el sistema
exports.getUsuarios = (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  //DEVUELVE SOLO LOS CAMPOS QUE YO LE ESTOY INDICANDO
  Usuario.find(
    {},
    "nombre apellido_paterno apellido_materno email rol activo password"
  )
    .skip(desde)
    .limit(5)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(500).send({
          ok: false,
          mensaje: "Error Cargando Usuarios",
          errores: err,
          img_status: "https://http.cat/500"
        });
      }
      Usuario.count({}, (err, conteo) => {
        if (err) {
          return res.status(500).send({
            ok: false,
            errores: err,
            mensaje: "Hubo un problema en el conteo de Usuarios en el sistema",
            img_status: "https://http.cat/500"
          });
        }
        return res.status(200).send({
          ok: true,
          usuarios: usuarios,
          total: conteo,
          img_status: "https://http.cat/200"
        });
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
        errores: err,
        img_status: "https://http.cat/400"
      });
    }
    return res.status(201).send({
      ok: true,
      usuario,
      mensaje: "Usuario creado de manera exitosa",
      img_status: "https://http.cat/201"
    });
  });
};

//funcion para eliminar usuario el cual o solo se cambia de estatus o se elimina definitivamente y se manda por parametro

exports.eliminarUsuario = (req, res) => {
  let { id } = req.params;
  let { definitivo } = req.query;

  let accion = definitivo === undefined ? 0 : 1;

  if (accion === 0) {
    Usuario.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
      (error, usuarioBaja) => {
        if (error) {
          return res.status(500).send({
            ok: false,
            err: err,
            mensaje: "Error al dar de baja al usuario",
            img_status: "https://http.cat/500"
          });
        }
        if (!usuarioBaja) {
          return res.status(400).send({
            ok: false,
            mensaje: "Usuario no encontrado para dar de baja",
            img_status: "https://http.cat/400"
          });
        }
        return res.status(200).send({
          mensaje: "Usuario Dado de  Baja Manera Correcta",
          ok: true,
          img_status: "https://http.cat/200"
        });
      }
    );
  } else {
    Usuario.findByIdAndDelete(id, (err, usuario_borrado) => {
      if (err) {
        return res.status(500).send({
          ok: false,
          err: err,
          mensaje: "Error al eliminar el usuario",
          img_status: "https://http.cat/500"
        });
      }
      if (!usuario_borrado) {
        return res.status(400).send({
          ok: false,
          mensaje: "Usuario no encontrado para eliminar",
          img_status: "https://http.cat/400"
        });
      }
      return res.status(200).send({
        mensaje: "Usuario Eliminado de Manera Correcta",
        ok: true,
        img_status: "https://http.cat/200"
      });
    });
  }
};

//Funcion para actualizar los datos de los usuarios
exports.actualizarUsuario = (req, res) => {
  let { id } = req.params;
  let {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    password,
    rol,
    activo
  } = req.body;

  Usuario.findById(id, (err, usuarioActualizar) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        err: err,
        mensaje: "Error al buscar el usuario para actualizar",
        img_status: "https://http.cat/500"
      });
    }
    if (!usuarioActualizar) {
      return res.status(400).send({
        ok: false,
        mensaje: "Usuario no encontrado para modificar",
        img_status: "https://http.cat/400"
      });
    }

    //validamos si mandaron el valor o no
    usuarioActualizar.nombre =
      nombre === undefined ? usuarioActualizar.nombre : nombre;

    usuarioActualizar.apellido_paterno =
      apellido_paterno === undefined
        ? usuarioActualizar.apellido_paterno
        : apellido_paterno;

    usuarioActualizar.apellido_materno =
      apellido_materno === undefined
        ? usuarioActualizar.apellido_materno
        : apellido_materno;

    usuarioActualizar.email =
      email === undefined ? usuarioActualizar.email : email;

    usuarioActualizar.rol = rol === undefined ? usuarioActualizar.rol : rol;

    usuarioActualizar.activo =
      activo === undefined ? usuarioActualizar.activo : activo;

    usuarioActualizar.password =
      password === undefined
        ? usuarioActualizar.password
        : bcrypt.hashSync(password, 10);

    usuarioActualizar.save((err, usuarioActualizado) => {
      if (err) {
        return res.status(500).send({
          ok: false,
          err: err,
          mensaje: "Error al eliminar el usuario",
          img_status: "https://http.cat/500"
        });
      }
      if (!usuarioActualizar) {
        return res.status(400).send({
          ok: false,
          mensaje: "Usuario no encontrado para modificar",
          img_status: "https://http.cat/400"
        });
      }
      return res.status(200).send({
        ok: true,
        mensaje: "Mensaje actualizado de manera correcta",
        usuario: usuarioActualizado,
        img_status: "https://http.cat/200"
      });
    });
  });
};

function obtenerMenuUsuarios() {

  
}
