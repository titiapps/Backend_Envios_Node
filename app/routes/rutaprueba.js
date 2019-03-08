const express = require("express");

const routes = express.Router();

/* let SubMenu = require("../models/menus/submenu"); */
let Menu = require("../models/menus/menu");

routes.get("/rutaprueba/", (req, res) => {
  let submenu_insertar = {
    titulo: "Seguimiento",
    url: "/Seguimiento",
    rol: ["Zorrita", "Chapparrita"]
  };

  let menu = new Menu();

  menu.titulo = "Envios";
  menu.submenu.push(submenu_insertar);
  menu.save((err, menufin) => {
    if (err) {
      return res.send({ error });
    }
    return res.send({ menufin });
  });
});

routes.get("/rutaprueba2/", (req, res) => {
  let id = "5c82dfb6542ce12ac0241b13";
  let submenu_insertar = {
    titulo: "Actualizar_Usuarios",
    url: "/Actualizar_Usuarios",
    rol: ["Teibolera", "Albañil"]
  };
  Menu.findById(id, (error, menu_act) => {
    menu_act.submenu.push(submenu_insertar);
    menu_act.save((err, menufin) => {
      if (err) {
        return res.send({ err });
      }
      return res.send({ menufin });
    });
  });
});

/* routes.get("/rutaprueba3/", (req, res) => {
  Menu.find({})
    .populate("submenu")
    .exec((err, menu) => {
      if (err) {
        return res.status(500).json({
          errors: err
        });
      }
      return res.send({ mensaje: menu });
    });
});  */

module.exports = routes;
