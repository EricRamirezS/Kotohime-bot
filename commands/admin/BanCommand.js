const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const updateDB = require('../../listener/db/DBaddBannedUser');
const {guild, keys} = require('../../listener/db/JSONSListeners');

class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'admin',
            memberName: 'ban',
            description: 'Banear temporalmente a un usuario sin expulsarlo del servidor',
            examples: ['ban <@386007907113762816> 1', 'rol <@386007907113762816> 60 ¡Por ser genial!'],
            guildOnly: true,
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'usuario',
                    prompt: '¿A quién debo banear?',
                    type: 'member',
                }
                ,
                {
                    key: 'duracion',
                    prompt: '¿Cuanto durará el ban (en minutos)?\nSi el baneo es indefinído, indica 0 minutos.',
                    type: 'integer',
                    validate: duracion => duracion >= 0,
                }
                ,
                {
                    key: 'razon',
                    prompt: '¿Por qué está siendo baneado?',
                    type: 'string',
                    default: "No explicitada"
                }
            ]
        });
    }

    hasPermission(msg) {
        let userCanBan = msg.member.hasPermission("BAN_MEMBERS");
        return userCanBan;
    }

    async run(message, args) {
        let guild_data = await guild(message.guild.id);
        if (guild_data) {
            let ban_public_notification_channel = message.guild.channels.cache.find(x => x.id === guild_data[keys.ban_public_notification_channel]);
            let ban_channel = message.guild.channels.cache.find(x => x.id === guild_data[keys.ban_channel_id]);
            let ban_role = message.guild.roles.cache.find(x => x.id === guild_data[keys.ban_role_id]);
            if (ban_role) {
                args.usuario.roles.add(ban_role).then(async () => {
                    let tiempo;
                    let inicio = Date.now();
                    let inicio_str = moment(inicio).format('DD/MM/YYYY h:mm:ss');
                    let fin;
                    let fin_str;
                    if (args.duracion) {
                        tiempo = args.duracion + " minutos";
                        fin = Date.now() + args.duracion * 60000;
                        fin_str = moment(fin).format('DD/MM/YYYY h:mm:ss');
                    } else {
                        tiempo = "Indefinido";
                        fin = null;
                        fin_str = "Indefinido";
                    }
                    let embed = new Discord.MessageEmbed()
                        .setTitle('Usuario Baneado')
                        .setThumbnail(args.usuario.user.displayAvatarURL())
                        .addField('Usuario', args.usuario.user.username, true)
                        .addField('Duración', tiempo, true)
                        .addField('Razón', args.razon, false)
                        .addField('Hora del baneo', inicio_str, true)
                        .addField('Hora de termino', fin_str, true)
                        .setColor("#FF0000");
                    if (ban_public_notification_channel) {
                        ban_public_notification_channel.send(embed);
                    }
                    if (ban_channel) {
                        ban_channel.send(args.usuario.toString() + ", lo siento, pero has sido baneado.");
                        ban_channel.send(embed);
                    }
                    updateDB(args.usuario.user.id, message.guild.id, inicio / 1000.0, fin ? fin / 1000.0 : fin, args.razon, ban_role.id);
                });
            }

        }
    }
}

module.exports = BanCommand;
