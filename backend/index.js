import express from "express";
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import locationsRoute from './routes/locationsRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

app.get('/', (reqest, response) => {
    console.log(request);
    return response.status(234).send('Hello World');
    });

app.use('/locations', locationsRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
    })

    .catch((error) => {
        console.log('MongoDB connection error: ', error);
    });


