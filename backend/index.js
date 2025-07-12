import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';
import userAuthRoutes from './routes/authRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    //origin : process.env.CLIENT_URL || process.env.ADMIN_URL,
    //origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    origin: "*", 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

app.use('/api/auth',userAuthRoutes);
app.use('/api/offers',offerRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
