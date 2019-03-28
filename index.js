/* ------------------------------------------------------------------------------------------- */
/* -----------------------LIBRERIAS E IMPORTACIONES Y CONFIGURACIONES------------------------- */
const app = require("./app/app");
require("dotenv").config(); //Para variables de entorno
const mongoose = require("mongoose");

const puerto = process.env.PORT;
const url_mongo = process.env.MONGO_URL;

/* ------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------- */

//aqui se levanta el servidor con express
app.listen(puerto, () => {
  console.log("SERVIDOR LEVANTADO EN EL PUERTO:" + process.env.PORT);
});

//aqui se levanta el servidor de mongo
mongoose.connect(url_mongo, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Hay un problema al levantar el servidor de mongo");
  } else {
    console.log("Servidor de mongo levantado de manera correcta");
  }
  
});

