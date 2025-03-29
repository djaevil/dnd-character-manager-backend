import express from 'express';
import dotenv from 'dotenv';
import connectDB from './app/config/db.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));