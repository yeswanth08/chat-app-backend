import express from "express";
import { rootRouter } from "./root.routes";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());

app.use('/api',rootRouter);
app.use('/',(_,res)=>{
    res.json({
        msg: "Health Check"
    });
});


app.listen(PORT,()=>console.log(`server is running on port ${PORT} 🚀`));