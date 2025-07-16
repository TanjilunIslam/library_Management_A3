require('dotenv').config();
import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const PORT = 5000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3e5k7se.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('connected to mongodb using mongoose');
        server = app.listen(PORT, () => {
            console.log(`working on ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}


main(); 