const { Command } = require('discord-akairo');

class BanAmountCommand extends Command {
    constructor() {
        super('ban amount', {
            aliases: ['banamount', 'bancount', 'bcount', 'countbans'],
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: ['BAN_MEMBERS'],
            channel: 'guild',
            gategory: 'guild',
            description: {
                content: 'Sends info about all the bans that the bot has done on the server'
            }
        });
    }

    exec(message) {
        this.client.model.Guild.findOne(
            {
                guildID: message.guild.id
            },
            (err, res) => {
                if (err) this.client.logger.error({ event: 'error' }`${err}`);
                if (!res || res.bans < 1) {
                    return message.reply('this guild has not banned anyone using me.');
                } else {
                    const today = new Date();
                    const embed = this.client.util
                        .embed()
                        .setColor(this.client.color.blue)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL)
                        .setDescription([
                            `This guild has ${res.bans} logged bans`,
                            `Latest banned user: ${res.guildBans[res.guildbans.length].username}. Banned at ${res.guildBans[res.guildBans.length].date}`
                        ])
                        .setTimestamp(today);
                    return message.util.send(embed);
                }
            }
        );
    }
}

module.exports = BanAmountCommand;
