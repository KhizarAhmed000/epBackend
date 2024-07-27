const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: String,
  lastname: String,
  password: String,
  email: String,
  role: String,
});

const member = mongoose.model("Member", MemberSchema);
module.exports = member;