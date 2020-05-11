import {Command} from '../Command';
import {Message, Permissions} from 'discord.js';
1
class EvalCommand extends Command {

  constructor() {
    super('evaluate', ['eval'], Permissions.FLAGS.ADMINISTRATOR, true);
  }

  async onCommand(message: Message, rawArgs:string, args: string[]) {
    if(rawArgs.length == 0) {
      return message.reply('utilize: `l!evaluate <code>`!');
    }

    const response = await eval(rawArgs);
    return message.reply("response: " + response);
  }

}

module.exports = new EvalCommand();