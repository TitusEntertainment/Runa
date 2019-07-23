const { Listener } = require('discord-akairo');
class MissingPermissionsEvent extends Listener {
    constructor() {
        super('missing perms', {
            emitter: 'client',
            event: 'missingPermissions'
        });
    }

    exec(message, command, type, missing) {
        if (type === 'client') {
            this.client.logger.warn(
                `Missing permissions in guild: ${message.guild.name}, guildID: ${message.guild.id}`,
                missing,
                command
            );

            return message.reply(
                `It seems like I am missing the nececary permissions to do the ${command}! Missing permission: ${missing}`
            );
        } else {
            return message.reply(
                `You're missing the permission "${missing}. Without that permission you can't execute the ${command} command."`
            );
        }
    }
}

module.exports = MissingPermissionsEvent;
