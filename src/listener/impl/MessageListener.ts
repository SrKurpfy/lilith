import {Listener} from '../ListenerHandler';
import {Client, Message} from 'discord.js';
import {storage} from '../../index';
import {addToQueue} from '../../user/UserQueue';

class MessageListener extends Listener {
    async on(message : Message) {

        if(message.author.bot) return;
        if(message.content.startsWith("l!")) return;

        let user = await storage.getOrFetchByDiscordId(message.author.id);
        if(user == null) user = await storage
            .create(message.author.id, message.guild.id);


        user.experience += 500000;

        const toUpgrade = user.toUpgrade();
        user.level += toUpgrade;

        addToQueue(user);

        if(toUpgrade > 0)
            await message.reply('você evoluiu para o nível ' + user.level);
    }

    register(client: Client) {
        client.on(`message`, args => this.on(args));
    }
}

module.exports = new MessageListener();