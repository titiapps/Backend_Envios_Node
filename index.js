/* ------------------------------------------------------------------------------------------- */
/* -----------------------LIBRERIAS E IMPORTACIONES Y CONFIGURACIONES------------------------- */
const app = require("./app/app");
require("dotenv").config(); //Para variables de entorno
const puerto = process.env.PORT;
/* ------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------- */

app.listen(puerto, () => {
  console.log("SERVIDOR LEVANTADO EN EL PUERTO:" + process.env.PORT);
});
