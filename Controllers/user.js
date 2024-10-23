import User from "../Schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
      expiresIn: "15d",
    });

    res.json({
      user,
      message: `Welcome ${user.username}`,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided. Authorization denied." });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token. Authorization denied." });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User profile retrieved successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
