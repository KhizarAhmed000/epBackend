const Engineer = require('../models/Engineer');

// Create a new engineer
exports.createEngineer = async (req, res, next) => {
  try {
    const { email,name, lastname, nameOfField, nameOfInstitute, passingYear, urlOfLicensePdf, urlOfPaymentReceiptPdf, approved } = req.body;
    const newEngineer = await Engineer.create({
      email, 
      name,
      lastname,
      nameOfField,
      nameOfInstitute,
      passingYear,
      urlOfLicensePdf,
      urlOfPaymentReceiptPdf,
      approved,
    });
    return res.status(201).json({ message: "Engineer created successfully", engineer: newEngineer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// Approve an engineer
exports.approveEngineer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEngineer = await Engineer.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!updatedEngineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }
    return res.status(200).json({ message: "Engineer approved successfully", engineer: updatedEngineer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getAllEngineers = async (req, res, next) => {
    try {
      const engineers = await Engineer.find();
      return res.status(200).json({ status: 200, message: "Engineers retrieved successfully", engineers });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
    }
  };