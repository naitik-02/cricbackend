import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true
         
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
