import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));