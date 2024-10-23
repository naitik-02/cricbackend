import express from "express";
import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
} from "../Controllers/players.js";
import { isAuth } from "../Middleware/isAuth.js";

const router = express.Router();

router.post("/players/new", isAuth, createPlayer);

router.get("/players/all", isAuth, getAllPlayers);

router.get("/players/:id", isAuth, getPlayerById);

export default router;
