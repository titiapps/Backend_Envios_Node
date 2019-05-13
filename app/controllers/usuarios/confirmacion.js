let Usuario = require("../../models/usuario");
const nodemailer = require('nodemailer');
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

exports.recuperarPswd = (req, res) => {

    let {email} = req.body;
    console.log(email);

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
                mensaje: "El email no se encuentra en nuestro sistema.",
                error: err,
                img_status: "https://http.cat/400"
            });
        }


        let token = jwt.sign({ usuario: usuario_bus }, process.env.SEED, {
            expiresIn: 86400
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
