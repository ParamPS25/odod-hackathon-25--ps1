import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin : process.env.CLIENT_URL || process.env.ADMIN_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// routes
app.get('/', (req, res) => {
    res.send('API is up and running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
