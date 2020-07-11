/**
 * Se emite cada vez que un usuario se une a un servidor.
 * @param member El miembro que se ha unido a un servidor.
 * @see https://discord.js.org/#/docs/main/stable/class/GuildMember
 */
module.exports = (member) => {

    sendLog(member);

};


/**
 * Envia un mensaje de notificación al canal #general del servidor
 * @param member El miembro que se ha unido al servidor.
 */
sendLog = (member) => {
    let chan = member.guild.channels.find("id","386366248306343937");
    chan.send(member.user.username +" se ha unido al servidor.");
};