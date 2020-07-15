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


/**
 * Verificando si el usuario se unió/movió/abandonó un canal de voz, y enviando
 * el mensaje de log pertinente al canal #voz del servidor
 * @param oldMember El miembro antes de la actualización del estado de voz.
 * @param newMember El miembro después de la actualización del estado de voz.
 */
let sendJoinMoveLeaveLog = (oldMember, newMember) => {
    let chan = newMember.guild.channels.find("id","385996736990281730");
    let nombre = "**"+oldMember.user.username+"**";
    let oldChannel = oldMember.voiceChannelID;
    let newChannel = newMember.voiceChannelID;
    if (oldChannel){
        if(newChannel){
            let oldChannelName = "**"+newMember.guild.channels.find("id",oldChannel+"").name+"**";
            let newChannelName = "**"+newMember.guild.channels.find("id",newChannel+"").name+"**";
            if (oldChannelName !== newChannelName){
                chan.send(nombre+" se ha movido de "+oldChannelName+" a "+newChannelName);
            }
        }else {
            let oldChannelName = "**"+newMember.guild.channels.find("id",oldChannel+"").name+"**";
            chan.send(nombre+" se retiró de "+oldChannelName);
        }
    } else {
        let newChannelName = "**"+newMember.guild.channels.find("id",newChannel+"").name+"**";
        chan.send(nombre+" se unió a "+newChannelName);
    }
};