const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const User = db.userAuth;

exports.register = async (req, res) => {
  try {
    const { username, email, password,mobile,gender } = req.body;
    const user = await User.create({ username, email, password,mobile,gender });
   

     res.status(200).json({
      success: true,
      message: "fetched successfully",
      Data: user
    });
  
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id },  process.env.JWT_SECRET, { expiresIn: "5h" });

      const userData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

     res.status(200).json({
      success: true,
      message: "fetched successfully",
      Data: {token,user:userData
      }
    });
  
  } catch (err) {
  
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
      error: err.message
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email','mobile','gender']
    });
    if (!user) return res.status(404).json({ message: "User not found" });
     res.status(200).json({
      success: true,
      message: "fetched successfully",
      Data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
      error: err.message
    });s
  }

};
