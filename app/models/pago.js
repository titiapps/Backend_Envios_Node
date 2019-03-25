const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

var pagosValidos = {
  values: ["Tarjeta", "CXC"]
};

let Schema = mongoose.Schema;

let PagoSchema = new Schema({
  id_pago_plataforma: { type: String },
  monto: { type: Number, required: true },
  forma_pago: { type: String, enum: pagosValidos }
});

module.exports = mongoose.model("pago", PagoSchema);
