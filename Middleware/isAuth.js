import User from "../Schemas/user.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        message: "login first",
      });
    }

    const decodeddata = jwt.verify(token, process.env.jwt_secret);

    req.user = await User.findById(decodeddata.id);

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
