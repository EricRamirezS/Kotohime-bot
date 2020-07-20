/**
 * Se emite cada vez que el cliente se une a un servidor.
 * @param guild El nuevo servidor
 * @see https://discord.js.org/#/docs/main/stable/class/Guild
 */
module.exports = (guild) => {
    //TODO
};

function registrarGUild(guild){
    let query = {
        text: 'INSERT INTO GUILD(GUILD_ID) values($1)',
        values: [guild.id]
    }
}