/**
 * Se emite cada vez que un miembro abandona un servidor o es expulsado/baneado.
 * @param member El miembro que ha dejado / ha sido expulsado del servidor
 * @see https://discord.js.org/#/docs/main/stable/class/GuildMember
 */
module.exports = (member) => {

    sendLog(member);

};




const { guild, keys} = require('../../../../db/JSONSListeners');
/**
 * Envia un mensaje de notificación al canal #general del servidor
 * @param member El miembro que se ha retirado al servidor.
 */
let sendLog = async (member) => {
    let guild_data = await guild(member.guild.id);
    if (guild_data) { //Asegurando que se ha obtenido un json
        let channel_id = guild_data[keys.welcome_channel_id];
        if (channel_id) { // Si la guild ha registrado un log de ingresos/egresos
            let chan = member.guild.channels.cache.find(x => x.id === channel_id);
            chan.send(`**${member.user.username}** ha dejado el servidor.`);
        }
    }
};