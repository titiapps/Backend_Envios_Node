const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let SubMenuSchema = new Schema({
  titulo: { type: String },
  url: {
    type: String
  },
  rol: [String]
});

let MenuSchema = new Schema({
  titulo: { type: String },
  submenu: [SubMenuSchema]
});

module.exports = mongoose.model("menu", MenuSchema);
