let Usuario = require("../../models/usuario");
const emailController = require('../../controllers/email/email');
const nodemailer = require('nodemailer');
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "20334252fcd8b3",
        pass: "20e4d5b15db4d2"
    }
});

transport.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});


exports.recupera = (req, res) => {

    let {
        nombre,
        apellido_paterno,
        apellido_materno,
        email,
        telefono,
        password,
        activo,
        _id
    } = req.body;

    let user = new Usuario({
        nombre,
        apellido_paterno,
        apellido_materno,
        email,
        telefono,
        password,
        activo,
        _id
    });
    //let {email} = req.body;
    console.log(user);
    if(email !== undefined){

        let token = jwt.sign({ usuario: user }, process.env.SEED, {
            expiresIn: 86400
        });

        let link = "http://localhost:4200/#/newPass";

        const mailOptions = {
            from: '"Example Team" <from@example.com>',
            to: 'user1@example.com, '+user.email,
            subject: 'Nice Nodemailer test',
            text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
            html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer\n<br> ' +
                ' <a  href = "http://localhost:4200/#/newpass/'+user._id+''+token+'"> reset pass</a>  \n '
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });


        return res.status(200).send({
            mensaje: "Envio de correo de recuperacion exitoso!",
            ok: true,
            img_status: "https://http.cat/200"
        });
    }else{
        return res.status(500).send({
            mensaje: "Envio de correo fallido!",
            ok: false,
            img_status: "https://http.cat/500"
        });
    }
};
