const { Command } = require('discord-akairo');

class UnbanCommand extends Command {
    constructor() {
        super('unbnan', {
            aliases: ['unban', 'unhammer'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            category: 'moderation',
            description: {
                content: 'unbans a user',
                usage: ['<userID> <reason>']
            },
            args: [
                {
                    id: 'user'
                },
                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason given'
                }
            ]
        });
    }

    exec(message, args) {
        if (!args.user || args.user.length < 1) {
            return message.reply(
                'You need to include a userResolvable, such as a userID you can get this from the logs'
            );
        }
        const today = new Date();
        const embed = this.client.util
            .embed()
            .setColor(this.client.color.blue)
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`User: <@${args.user}> has been unbanned`)
            .addField('**Unbanned by:**', message.author)
            .addField('**Reason:**', args.reason)
            .setThumbnail(this.client.user.displayAvatarURL)
            .setTimestamp(today);

        message.guild.members.unban(args.user, args.reason).catch(e => {
            if (e) {
                // eslint-disable-next-line no-console
                console.log(e);
                return message.reply(`Something went wrong! Error message: ${e.message}`);
            } else {
                return this.client.msg(message, embed);
            }
        });
        return undefined;
    }
}

module.exports = UnbanCommand;
