/**
 * Se emite cada vez que cambia un miembro del servidor, es decir,
 * una nueva rol, una rol eliminado, un apodo.
 * @param oldMember El estado miembro antes del cambio
 * @param newMember El estado del miembro despues del cambio
 * @see https://discord.js.org/#/docs/main/stable/class/GuildMember
 */
module.exports = (oldMember, newMember) => {
    roleChanged(oldMember, newMember);
    //TODO
};


/**
 * Verifica si ha ocurrido un cambio de rol, y emite un mensaje en caso de ser así.
 * @param oldMember El estado miembro antes del cambio
 * @param newMember El estado del miembro despues del cambio
 */
function roleChanged(oldMember, newMember) {
    let oldRoles = oldMember.roles;
    let newRoles = newMember.roles;
    let channelCambioRoles = newMember.guild.channels.find("id", "593913543833681920");
    let distincRoles = oldRoles.filter((v, i, newRoles) => newRoles.indexOf(v) === i);
    for (let i = 0; i < distincRoles.length; i++) {
        if (oldRoles.includes(distincRoles[i])) {
            channelCambioRoles.send("A " + oldMember + " se le ha removido el rol de " + distincRoles[i]);
        }
        if (newRoles.includes(distincRoles[i])) {
            channelCambioRoles.send("A " + newMember + " se le ha otorgado el rol de " + distincRoles[i]);
        }
    }
}