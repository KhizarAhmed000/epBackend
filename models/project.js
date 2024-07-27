const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  engineer: String,
  projectName: String,
  startDate: String,
  endDate: String,
  value: Number,
  description: String,
  imgArray: Array,
});

const project = mongoose.model("Project", ProjectSchema);
module.exports = project;