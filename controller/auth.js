;
require("dotenv").config();


const Member = require('../models/Member');

exports.signup = async (req, res, next) => {
  try {
    const { name, lastname, password, email, role } = req.body;
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ status: 400, message: "Email already exists" });
    } else {
      const newMember = await Member.create({
        name,
        lastname,
        password,
        email,
        role,
      });
      return res.status(200).json({ message: "Signup success", newMember });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ status: 400, message: "Invalid email or password" });
    }

    if (member.password !== password) {
      return res.status(400).json({ status: 400, message: "Invalid email or password" });
    }

    const { role } = member;
    return res.status(200).json({ message: "Signin success", member: { email: member.email, role } });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
