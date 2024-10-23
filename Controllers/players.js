import Player from "../Schemas/player.js";


export const createPlayer = async (req, res) => {
    const { name, position, points } = req.body;

    try {
        const newPlayer = new Player({
            name,
            position,
            points,
            
        });

        await newPlayer.save();
        res.status(201).json({ message: 'Player created successfully', player: newPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json({players});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getPlayerById = async (req, res) => {
    const { id } = req.params;

    try {
        const player = await Player.findById(id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json({player});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

