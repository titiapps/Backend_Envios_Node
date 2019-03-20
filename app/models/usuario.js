const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let rolesPermitidos = {
  values: ["Administrador", "Administrador_Dev", "Empleado", "Usuario"]
};

let UsuarioSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  apellido_paterno: {
    type: String,
    required: [true, "El apellido paterno es necesario"]
  },
  apellido_materno: {
    type: String,
    required: [true, "El apellido materno es necesario"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo electronico es necesario"]
  },
  telefono: {
    type: String,
    unique: true,
    required: [true, "El numero de telefono es obligatorio"]
  },
  password: {
    type: String,
    required: [true, "El password es necesaria"]
  },
  rol: {
    type: String,
    required: true,
    default: "Usuario",
    enum: rolesPermitidos
  },
  activo: {
    type: Boolean,
    required: true,
    default: true
  }
});

UsuarioSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("usuario", UsuarioSchema);
