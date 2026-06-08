import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true,
    },
});