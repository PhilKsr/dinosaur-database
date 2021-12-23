import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017/";

const client = new MongoClient(connectionString);

export default client;
