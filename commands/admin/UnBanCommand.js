const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const updateDB = require('../../db/DBUpdateGuildSetting').unban;
const {guild, keys} = require('../../db/JSONSListeners');

class UnBanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            group: 'admin',
            memberName: 'unban',
            description: 'Remover baneo temporal o indefinido realizado a traves del comando `ban`.\n' +
                '*Esto no remueve los baneos realizados a traves de las opciones de Discord.*',
            examples: ['ban <@386007907113762816> 1', 'ban <@386007907113762816> 60 ¡Por ser genial!'],
            guildOnly: true,
            clientPermissions: ['MANAGE_ROLES'],
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'usuario',
                    prompt: '¿A quién debo removerle el baneo?',
                    type: 'member',
                }
            ]
        });
    }

    async run(message, args) {
        let guild_data = await guild(message.guild.id);
        if (guild_data) {
            if (guild_data[keys.ban_role_id]) {
                let role = message.guild.roles.cache.get(guild_data[keys.ban_role_id]);
                updateDB(args.usuario.id, message.guild.id)
                    .then(() => {
                        args.usuario.roles.remove(role)
                            .then(() => {
                                message.channel.send(args.usuario.toString() + " ha sido desbaneado exitosamente.");
                            });
                    })
                    .catch(e => {
                        console.log(e);
                        message.reply("Por alguna razón, no he podido realizar el baneo, si este problema persiste, informale al desarrollador a traves del comandos `feedback`");
                    });
            }
        }
    }
}

module.exports = UnBanCommand;
