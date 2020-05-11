import {Client} from "discord.js";
import { readdirSync } from 'fs';

export function loadListeners(client : Client) {
    for (let string of readdirSync(`src/listener/impl`)) {
        if(!string.endsWith(".ts")) continue;

        const listener = require(`./impl/${string}`);

        if(listener instanceof Listener) {
            listener.register(client);
        }
    }
}

export abstract class Listener {

    abstract register(client : Client);
    abstract on(... args);
}

