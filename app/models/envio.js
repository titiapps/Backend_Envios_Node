const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

var PaqueteriasValidas = {
  values: ["DHL"]
};

let EnviosSchema = new Schema({
  o_origen: { type: Schema.Types.ObjectId, ref: "direccion" },
  o_destino: { type: Schema.Types.ObjectId, ref: "direccion" },
  paqueteria: { type: String },
  servicio: { type: String },
  carrier_account_id: { type: String },
  shipment_id: { type: String },
  paquete_longitud: { type: Number },
  paquete_anchura: { type: Number },
  paquete_altura: { type: Number },
  paquete_peso: { type: Number }
});

EnviosSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("envio", EnviosSchema);
