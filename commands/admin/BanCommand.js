const commando = require('discord.js-commando');

class BanCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban*',
            description: 'Asignar o abandonar un rol',
            examples: ['rol listar', 'rol obtener [rol]', 'rol abandonar [rol]'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'usuario',
                    prompt: '¿A quién debo banear??',
                    type: 'member',
                }
                ,
                {
                    key: 'razón',
                    prompt: '¿Por qué está siendo baneado?',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }

    async run(message, args) {
    }
}

module.exports = BanCommand;
