/* ESTE ARCHIVO VA A SER EL ENCARGADO DE CENTRALIZAR TODAS LAS RUTAS */

const rutasprueba = require("./rutaprueba");
const rutasusuario = require("./usuarios_rutas");
const rutasautorizacion = require("./autorizacion");
module.exports = {
  rutasprueba,
  rutasusuario,
  rutasautorizacion
};
