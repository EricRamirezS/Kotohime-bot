const commando = require('discord.js-commando');
const updateDB = require('../../db/DBUpdateGuildSetting').unban;
const {guild, keys, syncGuild} = require('../../db/JSONSListeners');

class FreeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'liberar',
            group: 'admin',
            memberName: 'liberar',
            aliases: ["free"],
            description: 'Remover arresto temporal o indefinido realizado a traves del comando `arrestar`.',
            examples: ['liverar <@386007907113762816>'],
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

    hasPermission(msg, ownerOverride) {
        let guild_data = syncGuild(msg.guild.id);
        let ban_role = msg.guild.roles.cache.find(x => x.id === guild_data[keys.ban_role_id]);

        return !!ban_role;
    }

    async run(message, args) {
        let guild_data = await guild(message.guild.id);
        if (!(guild_data && guild_data[keys.ban_role_id])) return;

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

module.exports = FreeCommand;
