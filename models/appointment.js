const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  user: String,
  engineer: String,  
  clientName: String,
  projectTimeline: String,
  proposedValue: Number,
  appointmentDate: String,
  projectDetails: String,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;