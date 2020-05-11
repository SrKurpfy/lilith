import {Listener} from '../ListenerHandler';
import {Client, Message} from 'discord.js';
import {Command} from '../../command/Command';
import {getCommand} from '../../command/CommandHandler';

function parse(content: string): Command {
  if (!content.startsWith('l!')) return null;

  const commandName = content.includes(' ') ? content.substring(2, content.indexOf(' '))
    : content.substring(2);

  return getCommand(commandName);
}

class CommandListener extends Listener {
  on(message: Message) {
    const content = message.content;
    const command = parse(content);
    if (command == null) return;

    if (command.permission != 0 &&
      !message.member.hasPermission(command.permission)) return;

    if (command.rootCommand &&
      message.author.id !== '615669302225535007') return;

    const rawArgs = content.includes(' ') ? content.substring(content.indexOf(' ')) : '';
    const args = rawArgs.split(' ');

    command.onCommand(message, rawArgs, args);
  }

  register(client: Client) {
    client.on(`message`, args => this.on(args));
  }
}

module.exports = new CommandListener();