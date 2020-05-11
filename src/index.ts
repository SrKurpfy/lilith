import "reflect-metadata";
import "dotenv/config";

import {Client} from 'discord.js';

import { createConnection } from "typeorm";
import { IUserStorage, UserStorage } from "./user/UserStorage";
import { User } from "./entity/User";
import { loadListeners } from "./listener/ListenerHandler";
import {startQueue} from "./user/UserQueue";

export const client = new Client({
    fetchAllMembers: true
});

export const storage : IUserStorage = new UserStorage();

client.login(process.env.TOKEN).then(async ignored => {
    console.log(`[Lilith] Successfully connected to discord.js`);

    const connection = await createConnection();
    User.useConnection(connection);

    startQueue(storage);

    loadListeners(client);
});
