import express from 'express';
import cors from 'cors';
import connectDB from './database/mongoConfig'
import routes from './routes'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express();
app.use(cors());
connectDB()

const PORT: string | number = process.env.PORT || 3500

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// request payload middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`)
})