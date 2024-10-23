import express from "express";
import {
    createUser,
    loginUser,
    myProfile,
  
} from "../Controllers/user.js";
import { isAuth } from "../Middleware/isAuth.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/profile", isAuth, myProfile);



export default router;
