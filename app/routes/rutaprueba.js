const express = require("express");

const routes = express.Router();

routes.get("/rutaprueba/", (req, res) => {
  return res.send({ message: "prueba completada" });
});

routes.get("/rutaprueba/juanito", (req, res) => {
  return res.send({ message: "prueba completada1" });
});

module.exports = routes;
