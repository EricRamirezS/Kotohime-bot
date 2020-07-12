/**
 * Emitido cada vez que se actualizan los mensajes fijados de un canal.
 * Debido a la naturaleza del evento WebSocket, aquí no se puede proporcionar mucha información fácilmente;
 * debe revisar los mensajes fijados manualmente.
 *
 * El parámetro de time  será un objeto de Unix Epoch Date cuando no queden mensajes fijados.
 *
 * @param channel El canal donde ocurrió una actualización de mensaje fijado
 * @param time El tiempo en que el ultimo mensaje fue fijado
 * @see https://discord.js.org/#/docs/main/stable/class/Channel
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
module.exports = (channel, time) => {
    //TODO
};