const Member = require("../models/member");

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    return res.status(200).json({ status: 200, message: "Members retrieved successfully", members });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
};

