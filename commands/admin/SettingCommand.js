const commando = require('discord.js-commando');
const Discord = require('discord.js');
const {guild, keys} = require('../../listener/db/JSONSListeners');

class SettingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'configuraciones',
            group: 'admin',
            memberName: 'configuraciones',
            aliases: ['settings'],
            description: 'Muestra las configuraciones de este servidor',
            examples: ['configuraciones', 'settings'],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async run(message, args) {
        mostrarConfiguracion(message);
    }
}

async function mostrarConfiguracion(msg) {
    let guild_data = await guild(msg.guild.id);
    if (guild_data) {
        let embed = new Discord.MessageEmbed();
        embed.setTitle("CONFIGURACIÓN ACTUAL");
        let channel_chache = msg.guild.channels.cache;
        let welcome_channel = elementToString(channel_chache, guild_data[keys.welcome_channel_id]);
        let voice_log = elementToString(channel_chache, guild_data[keys.voice_log_id]);
        let ban_channel = elementToString(channel_chache, guild_data[keys.ban_channel_id]);
        let ban_public_noti_channel = elementToString(channel_chache, guild_data[keys.ban_public_notification_channel]);
        let touhou_commands = guild_data[keys.allow_touhou_commands] ? 'Sí' : 'No';
        let danmaku_commands = guild_data[keys.allow_danmaku_commands] ? 'Sí' : 'No';
        let prefix = guild_data[keys.prefix];
        let ban_role = elementToString(msg.guild.roles.cache, guild_data[keys.ban_role_id]);
        let roles = [];
        if (guild_data[keys.roles_bot_can_add]) {
            for (let i = 0; i < guild_data[keys.roles_bot_can_add].length; i++) {
                let role = msg.guild.roles.cache.find(x => x.id === guild_data[keys.roles_bot_can_add][i]);
                if (role)
                    roles.push(role.toString());
            }
        }
        if (!roles.length) roles = ["No definido"];
        embed.addField("Prefijo del bot", prefix, true);
        embed.addField("Canal de Bienvenida:", welcome_channel, true);
        embed.addField("Log de voz:", voice_log, true);
        embed.addField("Canal de baneos:", ban_channel, true);
        embed.addField("Notificación pública de baneo:", ban_public_noti_channel, true);
        embed.addField("Permitir comandos de Touhou", touhou_commands, true);
        embed.addField("Permitir comandos de Danmaku!! Card Game", danmaku_commands, true);
        embed.addField("Rol para baneos", ban_role, true);
        embed.addField("Roles que los usuarios pueden autoagregar", roles.join("\n"), true);
        msg.channel.send(embed);
    }
}

function elementToString(cache, id) {
    let element = cache.find(x => x.id === id);
    return element ? element.toString() : "No definido";
}

module.exports = SettingCommand;