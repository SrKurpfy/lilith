import {Message} from 'discord.js';

export abstract class Command {

  private readonly _name: string;
  private readonly _args: string[];

  private readonly _permission: number;
  private readonly _rootCommand: boolean;

  protected constructor(name: string, args: string[], permission: number, rootCommand: boolean) {
    this._name = name;
    this._args = args;

    this._permission = permission;
    this._rootCommand = rootCommand;
  }

  get name(): string {
    return this._name;
  }

  get args(): string[] {
    return this._args;
  }

  get permission(): number {
    return this._permission;
  }

  get rootCommand(): boolean {
    return this._rootCommand;
  }

  abstract onCommand(message: Message, rawArgs: string, args: string[]);
}