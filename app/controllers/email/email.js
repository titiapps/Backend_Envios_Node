let Usuario = require("../../models/usuario");
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

/*transport.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});*/

const mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: 'user1@example.com, user2@example.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};



exports.sendEmail = (req, res) => {

   let data = req.body;
   console.log(data.type);

   if(data.type === 'password'){


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

}
