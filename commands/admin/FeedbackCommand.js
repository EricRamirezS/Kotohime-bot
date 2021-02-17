const commando = require('discord.js-commando');

class UnBanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'feedback',
            group: 'admin',
            memberName: 'feedback',
            description: 'Enviaré un mensaje directo a mi desarrollador con lo que tengas que decir' +
                'Incluiré tu información de contacto, en caso de que el desarrollador quiera ponerse en' +
                'contacto contigo',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'mensaje',
                    prompt: '¿Qué debo decirle a mi desarrollador?',
                    type: 'string',
                    max: '1800'
                }
            ]
        });
    }

    async run(message, args) {
        await this.client.users.cache.get(process.env.DEVELOPER_ID).send(message.author.toString() + " | " + args.mensaje);
    }

}

module.exports = UnBanCommand;
