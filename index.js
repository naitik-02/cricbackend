import express from 'express';
import dotenv from 'dotenv'; 
import ConnectDatabase from './Database/db.js'
import userRouter from './Router/user.js'
import teamRouter from './Router/team.js'
import playerRouter from './Router/player.js'
import cors from 'cors'

dotenv.config(); 

const app = express();

app.use(cors());

app.use(express.json());


app.use('/api',userRouter)
app.use('/api',teamRouter)
app.use('/api',playerRouter)



const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
    ConnectDatabase()
});
