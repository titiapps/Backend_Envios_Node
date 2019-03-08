const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;
/* let listaEstatus = {
  values: ["Administrador","Administrador_Dev", "Empleado", "Termia"]
}; */

let MovimientoSchema = new Schema({
  o_usuario: { type: Schema.Types.ObjectId, ref: "usuario" },
  o_envio: { type: Schema.Types.ObjectId, ref: "envio" },
  o_pago: { type: Schema.Types.ObjectId, ref: "pago" },
  estatus: { type: String /* , enum: listaEstatus */ },
  fecha_movimiento: { type: Date }
});

UsuarioSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("movimiento", MovimientoSchema);
