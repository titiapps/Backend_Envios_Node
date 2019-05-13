/* ------------------------------------------------------------------------------------------- */
/* -----------------------LIBRERIAS E IMPORTACIONES Y CONFIGURACIONES------------------------- */
const app = require("./app/app");
require("dotenv").config(); //Para variables de entorno
const mongoose = require("mongoose");

const puerto = process.env.PORT;
const url_mongo = process.env.MONGO_URL;

/* ------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------- */

const dotenv = require("dotenv");

const result = dotenv.config();

try {
  if (result.error) throw result.error;
} catch (e) {
  console.log(e);
}

//aqui se levanta el servidor con express
app.listen(process.env.PORT || 8000, () => {
  console.log("SERVIDOR LEVANTADO EN EL PUERTO:" + process.env.PORT);
});

//aqui se levanta el servidor de mongo
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Base de datos levantada en el puerto 27017");
  })
  .catch(() => {
    console.log("Hay un problema al levantar la BD");
  });
