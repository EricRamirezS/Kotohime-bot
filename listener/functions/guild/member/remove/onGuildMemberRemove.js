/**
 * Se emite cada vez que un miembro abandona un servidor o es expulsado/baneado.
 * @param member El miembro que ha dejado / ha sido expulsado del servidor
 * @see https://discord.js.org/#/docs/main/stable/class/GuildMember
 */
module.exports = (member) => {

    sendLog(member);

};


/**
 * Envia un mensaje de notificación al canal #general del servidor
 * @param member El miembro que se ha retirado al servidor.
 */
let sendLog = (member) => {
    console.log("leaves");
    let chan = member.guild.channels.find("id", "386366248306343937");
    chan.send(member.user.username +" ha dejado el servidor.");
};