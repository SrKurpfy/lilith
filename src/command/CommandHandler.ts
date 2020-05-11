import {Command} from "./Command";
import {readdirSync} from "fs";

const commandArray : Command[] = [];

export function registerCommand(command : Command) {
    commandArray.push(command);
}

export function registerCommands(commands : Command[]) {
    commands.forEach(value => commandArray.push(value));
}

export function getCommand(name : string) : Command {
    for (let command of commandArray) {
        if(command.name == name || command.args.includes(name)) {
            return command;
        }
    }

    return null;
}

export function loadCommands() {
    for (let string of readdirSync(`src/command/impl`)) {
        if(!string.endsWith(".ts")) continue;

        const command = require(`./impl/${string}`);

        if(command instanceof Command) {
            registerCommand(command);
        }
    }
}