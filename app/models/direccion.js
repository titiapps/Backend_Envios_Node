const mongoose = require("mongoose");
const mongovalidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let DireccionSchema = new Schema({
  persona: { type: String },
  street: { type: String },
  street2: { type: String },
  houseNumber: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  county: { type: String },
  countryCode: { type: String },
  district: { type: String }
});

DireccionSchema.plugin(mongovalidator, {
  message: "El {PATH} debe de ser unico"
});

module.exports = mongoose.model("direccion", DireccionSchema);
