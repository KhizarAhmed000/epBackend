const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EngineerSchema = new Schema({
  name: String,
  lastname: String,
  nameOfField: String,
  nameOfInstitute: String,
  passingYear: Number,
  urlOfLicense: String,
  urlOfPaymentReceipt: String,
  approved: Boolean,
});

const Engineer = mongoose .model("Engineer", EngineerSchema);
module.exports = Engineer;      