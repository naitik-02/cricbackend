import express from "express";
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamPlayers,
  deleteTeam,
  getMyTeams,
} from "../Controllers/team.js";
import { isAuth } from "../Middleware/isAuth.js";

const router = express.Router();

router.post("/team/new", isAuth, createTeam);

router.get("/teams",isAuth, getAllTeams);

router.get("/team/:id",isAuth, getTeamById);
router.get("/myteam",isAuth, getMyTeams);

router.put("/team/:id", isAuth, updateTeamPlayers);

router.delete("/teams/:id", isAuth, deleteTeam);

export default router;
