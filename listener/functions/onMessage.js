/**
 * Se emite cada vez que se crea un mensaje.
 *
 * Esto incluye los mensajes creados por el Cliente
 *
 * @param message El mensaje creado
 * @see https://discord.js.org/#/docs/main/stable/class/Message
 */
module.exports = (message) => {
    if (message.author.username.toString()!=='HouraiESP') {
        console.log(message.author.username + ": " + message.toString());
    }
};