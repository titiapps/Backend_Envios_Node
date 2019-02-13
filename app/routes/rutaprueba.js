const express = require("express");

const routes = express.Router();

routes.get("/rutaprueba/", (req, res) => {
  return res.send({ message: "prueba completada" });
});

module.exports = routes;
