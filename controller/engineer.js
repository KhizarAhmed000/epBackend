const Engineer = require('../models/Engineer');
const Project = require('../models/Project');

// Create a new engineer
exports.createEngineer = async (req, res, next) => {
  try {
    const { email, name, lastname, nameOfField, nameOfInstitute, passingYear, urlOfLicense, urlOfPaymentReceipt, approved } = req.body;
    const newEngineer = await Engineer.create({
      email,
      name,
      lastname,
      nameOfField,
      nameOfInstitute,
      passingYear,
      urlOfLicense,
      urlOfPaymentReceipt,
      approved,
      hiredBy: []
    });
    return res.status(201).json({ message: "Engineer created successfully", engineer: newEngineer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// exports.removeEngineer = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     const engineer = await Engineer.findOne({ where: { email } });

//     if (!engineer) {
//       return res.status(404).json({ message: "Engineer not found" });
//     }

//     await Engineer.destroy({ where: { email } });

//     return res.status(200).json({ message: "Engineer removed successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

exports.removeEngineer = async (req, res, next) => {
  try {
    const { email } = req.body;
    const deletedEngineer = await Engineer.findOneAndDelete({ email });

    if (!deletedEngineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }

    return res.status(200).json({ message: "Engineer deleted", deletedEngineer });
  } catch (error) {
    console.error("Error deleting engineer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Approve an engineer
exports.approveEngineer = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingEngineer = await Engineer.findOne({ email: email });

    if (!existingEngineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }

    existingEngineer.approved = true;

    const updatedEngineer = await existingEngineer.save();

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


exports.hireEngineer = async (req, res, next) => {
  try {
    const { email, userEmail } = req.body;

    // Find and update the engineer, appending the new userEmail to the hiredBy array
    const updatedEngineer = await Engineer.findOneAndUpdate(
      { email },
      { $push: { hiredBy: userEmail } },
      { new: true }
    );

    if (!updatedEngineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }

    return res.status(200).json({ message: "User email appended to hiredBy array", engineer: updatedEngineer });
  } catch (error) {
    console.error("Error updating hiredBy array:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



exports.createProject = async (req, res, next) => {
  try {
    const { email, projectName, startDate, endDate, value, description, imgArray } = req.body;

    // Create a new project
    const newProject = await Project.create({
      engineer: email,
      projectName,
      startDate,
      endDate,
      value,
      description,
      imgArray
    });

    // Find the engineer and update their projects array
    const updatedEngineer = await Engineer.findOneAndUpdate(
      { email },
      { $push: { projects: newProject._id } },
      { new: true }
    );

    if (!updatedEngineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }

    return res.status(201).json({ message: "Project created and assigned to engineer", project: newProject, engineer: updatedEngineer });
  } catch (error) {
    console.error("Error creating project and assigning to engineer:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getEngineerProjects = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find the engineer by email
    const engineer = await Engineer.findOne({ email });

    if (!engineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }

    // Find projects by IDs
    const projects = await Project.find({ _id: { $in: engineer.projects } });

    return res.status(200).json({ message: "Projects retrieved successfully", projects });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getEngineer = async (req, res, next) => {
  try {
    const { email } = req.body;

    const engineer = await Engineer.findOne({ email });

    if (!engineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }


    return res.status(200).json({ message: "engineer retrieved: ", engineer });
  } catch (error) {
    console.error("Error retrieving engineer:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.removeProject = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Find the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ status: 404, message: "Project not found" });
    }

    // Find the engineer by the project's engineer field
    const engineer = await Engineer.findOne({ email: project.engineer });
    if (!engineer) {
      return res.status(404).json({ status: 404, message: "Engineer not found" });
    }

    // Remove the project ID from the engineer's projects array
    const updatedEngineer = await Engineer.findOneAndUpdate(
      { email: project.engineer },
      { $pull: { projects: id } },
      { new: true }
    );

    // Remove the project
    await Project.findByIdAndDelete(id);

    return res.status(200).json({ message: "Project removed successfully", engineer: updatedEngineer });
  } catch (error) {
    console.error("Error removing project:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

