const jwt = require("jsonwebtoken");
//Este middleware nos permite verificar que el token introducido es correcto
exports.verificarToken = (req, res, next) => {
  let token = req.headers.authorization;
console.log(req.headers);
  jwt.verify(token, process.env.SEED, (error, datos) => {
    if (error) {
      res.status(401).send({
        ok: false,
        error,
        mensaje: "Token Incorrecto",
        img_status: "https://http.cat/401"
      });
    } else {
      req.usuario_token_correcto = datos.usuario;
      next();
    }
  });
};




//Este middleware nos permite renovar el token en caso de que valga madre

//Este nos permite saber si es usuario tiene un rol correcto o
//si es el mismo usuario que quiere realizar una accion con su perfil

exports.verificarRoloUsuario = (req, res, next) => {
  let rol = req.usuario_token_correcto.rol; //viene de verificación del token
  let ut_id = req.usuario_token_correcto._id;
  let id = req.params.id; //el id se tiene que mandar para verificar que onda con esta accion que se quiere realizar

  let rolespermitidos = ["Administrador", "Administrador_Dev"];

  let permitido = rolespermitidos.findIndex(rol_per => {
    return rol_per == rol;
  });

  if (permitido > 0 || id === ut_id) {
    next();
  } else {
    return res.status(401).send({
      ok: false,
      mensaje: "No tiene un rol Permitido para poder realizar esta acción",
      img_status: "https://http.cat/401"
    });
  }
};
