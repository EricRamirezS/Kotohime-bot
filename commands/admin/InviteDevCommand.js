const commando = require('discord.js-commando');

class InviteDevCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'invitardev',
            group: 'admin',
            memberName: 'invitardev',
            description: 'Enviaré una invitación a mi desarrollador por si tienes problemas conmigo o por si solo' +
                'quieres que sea parte de tu comunidad.',
            guildOnly: true,
            aliases: ["invitedev"],
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['CREATE_INSTANT_INVITE'],
        });
    }

    async run(message, args) {
        message.channel.createInvite().then(r => {
            this.client.users.cache.get(process.env.DEVELOPER_ID).send(message.author.toString() + " | ha solicitado que te unas a su servidor. " + r.toString());
            message.reply("La invitación ha sido enviada.");

        });
    }

}

module.exports = InviteDevCommand;
