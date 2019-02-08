/* ------------------------------------------------------------------------------------------- */
/* -----------------------LIBRERIAS E IMPORTACIONES Y CONFIGURACIONES------------------------- */
const express = require("express");
const bodyparser = require("body-parser");
const { rutasprueba, rutasusuario } = require("./routes");
/* ------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------- */
const app = express();

//Codificalo a JSON
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Para evitar problemas con las peticiones
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST,PUT,GET,DELETE,OPTIONS");
  next();
});

//* RUTAS A USARSE */
app.use("/api/v1/", rutasprueba);
app.use("/api/v1/usuario/", rutasusuario);

module.exports = app;
