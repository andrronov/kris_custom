import express from 'express';
import { MongoClient } from "mongodb";
import 'dotenv/config'

const client = new MongoClient(process.env.DB_CONNECTION_URI);

const startServer = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.log(error);
    }
}

const app = express();
app.use(express.json());

app.listen(process.env.MAIN_PORT, () => {
    console.log(`Server is running on port ${process.env.MAIN_PORT}`);
    startServer();
})
