import {Listener} from "../ListenerHandler";
import {Client, Message, MessageEmbed} from "discord.js";
import {storage} from "../../index";
import {addToQueue} from "../../user/UserQueue";

class MessageListener extends Listener {
    async on(message : Message) {
        if(message.author.bot) return;

        let user = await storage.getOrFetchByDiscordId(message.author.id);
        if(user == null) user = await storage
            .create(message.author.id, message.guild.id);

        user.experience += 1000000;

        const toUpgrade = user.toUpgrade();
        user.level += toUpgrade;

        addToQueue(user);

        if(toUpgrade > 0) {

            const embed = new MessageEmbed()
                .setTitle("⭐ | LEVEL UP!")
                .addField("Nível atual:", user.level)
                .addField("Níveis upados:", toUpgrade)
                .setTimestamp();

            await message.channel.send(message.author, { embed: embed });
        }
    }

    register(client: Client) {
        client.on(`message`, args => this.on(args));
    }
}

module.exports = new MessageListener();