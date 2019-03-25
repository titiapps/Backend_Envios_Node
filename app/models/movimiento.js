const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;
/* let listaEstatus = {
  values: ["Administrador","Administrador_Dev", "Empleado", "Termia"]
}; */

let MovimientoSchema = new Schema({
  id_usuario: { type: Schema.Types.ObjectId, ref: "usuario" },
  id_envio: { type: Schema.Types.ObjectId, ref: "envio" },
  id_pago: { type: Schema.Types.ObjectId, ref: "pago" },
  num_guia: { type: String },
  num_etiqueta: { type: String }
});

UsuarioSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("movimiento", MovimientoSchema);
