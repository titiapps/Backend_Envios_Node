const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let DireccionSchema = new Schema({
  company: { type: String },
  street1: { type: String },
  street2: { type: String },
  country: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  phone: { type: Number }
});

DireccionSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("usuario", DireccionSchema);
