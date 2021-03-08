const guildData = require("../../../db/JSONSListeners").guild;
const registerGuild = require("../../../db/DBUpdateGuildSetting").registerGuild;
/**
 * Se emite cada vez que se crea un mensaje.
 *
 * Esto incluye los mensajes creados por el client
 *
 * @param message El mensaje creado
 * @see https://discord.js.org/#/docs/main/stable/class/Message
 */
module.exports = (message) => {
    if (message.author.username.toString() !== 'Kotohime') {
        console.log(message.guild.id + "| " +
            message.guild.name + " | " +
            message.channel.name + " | " +
            message.author.username + ": " +
            message.toString());
    }

    if (message.guild === null ) return;

    checkGuild(message.guild.id);
};

async function checkGuild(id) {
    let data = await guildData(id);

    if (data.length > 0) return;

    registerGuild(id);

}