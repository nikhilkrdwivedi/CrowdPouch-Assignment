import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import {config} from './config/index.js';
import globalRoute from './route/index.js';

const app = express();
// Server middleware 
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// Routes entry point
app.use('/api/v1',globalRoute);

const startApp = async() => {
    try {

        // Connection With DB
        await mongoose.connect(config.mongoURI, config.mongoOptions);
        console.log(`Mongoose default connection is open to ${config.mongoURI}`);

        // Start Listening for the server on PORT
        app.listen(config.PORT, () =>
            console.log(`Server started on PORT ${config.PORT} `)
        );
    } catch (err) {
        console.log(`Mongoose default connection has occurred ${err} error`);
        startApp();
    }
};

// Start server and initialization of database connection
startApp();