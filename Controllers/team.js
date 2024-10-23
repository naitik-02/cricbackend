import Team from "../Schemas/team.js";
import Player from "../Schemas/player.js";

export const createTeam = async (req, res) => {
  const { name, players } = req.body;

  try {
    const newTeam = new Team({
      name,
      players:players,
      user: req.user._id,
    });

    await newTeam.save();

    res
      .status(201)
      .json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("players", "name position points");

    res.status(200).json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeamById = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await Team.findById(id).populate(
      "players",
      "name position points"
    );

    if (!team) {
      return res.status(200).json({ message: "Team not found", length: 0 });
    }

    res.status(200).json({team});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyTeams = async (req, res) => {
  const userId = req.user._id;

  try {
    const teams = await Team.find({ user: userId });

    res.status(200).json({ teams, length: teams.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTeamPlayers = async (req, res) => {
  const { id } = req.params;
  const { action, playerId } = req.body;

  try {
    const team = await Team.findById(id);

    if (!team) {
      return res.status(200).json({ message: "Team not found", length: 0 });
    }

    // Ensure the user has permission to update the team
    if (team.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this team" });
    }

    if (action === "add") {
      if (team.players.length >= 11) {
        return res.status(400).json({
          message: "You cannot have more than 11 players in a team",
        });
      }

      if (team.players.includes(playerId)) {
        return res
          .status(400)
          .json({ message: "Player is already in the team" });
      }

      const playerExists = await Player.findById(playerId);
      if (!playerExists) {
        return res.status(404).json({ message: "Player not found" });
      }

      // Add player to the team
      team.players.push(playerId);
    }

    if (action === "remove") {
      // Ensure player is actually in the team before trying to remove
      const playerInTeam = team.players.some(
        (player) => player.toString() === playerId.toString()
      );

      if (!playerInTeam) {
        return res.status(400).json({ message: "Player is not in the team" });
      }

      // Remove the player from the team
      team.players = team.players.filter(
        (player) => player.toString() !== playerId.toString()
      );
    }

    // Save the updated team
    await team.save();

    res.status(200).json({ message: "Team updated successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    
    if (!deletedTeam) {
      return res.status(200).json({ message: "Team not found", length: 0 });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
