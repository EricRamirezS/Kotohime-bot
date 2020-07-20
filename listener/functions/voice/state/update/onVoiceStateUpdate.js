/**
 * Se emite cada vez que un usuario cambia el estado de voz,
 * por ejemplo, une/deja un canal, silencia/desactiva.
 * @param oldMember El miembro antes de la actualización del estado de voz.
 * @param newMember El miembro después de la actualización del estado de voz.
 * @see https://discord.js.org/#/docs/main/stable/class/GuildMember
 */
module.exports = function (oldMember, newMember) {

    sendJoinMoveLeaveLog(oldMember, newMember);

};


const { guild, keys} = require('../../../../db/JSONSListeners');
/**
 * Verificando si el usuario se unió/movió/abandonó un canal de voz, y enviando
 * el mensaje de log pertinente al canal #voz del servidor
 * @param oldMember El miembro antes de la actualización del estado de voz.
 * @param newMember El miembro después de la actualización del estado de voz.
 */
let sendJoinMoveLeaveLog = async (oldMember, newMember) => {
    let guild_data = await guild(newMember.guild.id);
    if (guild_data) { //Asegurando que se ha obtenido un json
        let channel_id = guild_data[keys.voice_log_id];
        if (channel_id) { // Si la guild ha registrado un log de voz
            let chan = newMember.guild.channels.cache.find(x => x.id === channel_id);
            let nombre = oldMember.guild.members.cache.find(x => x.id === oldMember.id);
            nombre = nombre.nickname? nombre.nickname: nombre.user.username;
            nombre = `**${nombre}**`;
            let oldChannel = oldMember.channelID;
            let newChannel = newMember.channelID;
            if (oldChannel) {
                if (newChannel) {
                    let oldChannelName = "**" + newMember.guild.channels.cache.find(x => x.id === oldChannel).name + "**";
                    let newChannelName = "**" + newMember.guild.channels.cache.find(x => x.id === newChannel).name + "**";
                    if (oldChannelName !== newChannelName) {
                        chan.send(nombre + " se ha movido de " + oldChannelName + " a " + newChannelName);
                    }
                } else {
                    let oldChannelName = "**" + newMember.guild.channels.cache.find(x => x.id === oldChannel).name + "**";
                    chan.send(nombre + " se retiró de " + oldChannelName);
                }
            } else {
                let newChannelName = "**" + newMember.guild.channels.cache.find(x => x.id === newChannel).name + "**";
                chan.send(nombre + " se unió a " + newChannelName);
            }
        }
    }
};