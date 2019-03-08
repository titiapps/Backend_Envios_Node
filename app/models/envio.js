const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

var PaqueteriasValidas = {
  values: ["DHL"]
};

let EnviosSchema = new Schema({
  /* fecha_movimiento: { type: Date } */
  o_origen: { type: Schema.Types.ObjectId, ref: "direccion" },
  o_destino: { type: Schema.Types.ObjectId, ref: "direccion" },
  paqueteria: { type: String, enum: PaqueteriasValidas },
  num_seg: { type: String }
});

EnviosSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("envio", EnviosSchema);
