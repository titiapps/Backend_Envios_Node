const express = require("express");

const routes = express.Router();

routes.get("/rutaprueba/", (req, res) => {
  let valores = req.body;

  console.log(valores);

  return res.send({ message: valores });
});

module.exports = routes;
