let SubMenu = require("../../models/menus/submenu");

exports.insertarMenu = (req, res) => {
  let submenu = new SubMenu({
    titulo: "Edicion_Usuarios",
    url: "/Edicion_Usuarios",
    rol: [{ tipo: "Albañil" }, { tipo: "Piruja" }]
  });

  submenu.save((err, menu) => {
    return res.send({ mensaje: "todo va perfectirri" });
  });
};
