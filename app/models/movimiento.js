const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let MovimientoSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: "usuario" },
  envio: { type: Schema.Types.ObjectId, ref: "envio" },
  pago: { type: Schema.Types.ObjectId, ref: "pago" },
  etiqueta: { type: String },
  etiqueta_pdf: { type: String },
  num_guia: { type: String },

  fecha_movimiento: { type: Date }
});

MovimientoSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("movimiento", MovimientoSchema);
