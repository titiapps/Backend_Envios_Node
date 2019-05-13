let Usuario = require("../models/usuario");

exports.checkEmail = (req, res, next) =>{
    let {email} = req.body;
    Usuario.findOne({email}).exec ((err, user) =>{
        if (!user) {
            console.log(user);
            return res.send({
                ok: false,
                mensaje: "usuario no encontrado" });
        }
        if (err) {
            return res.send({ err });
        }
        req.user = user;
        next();
    });
};
