/**
 * Se emite cuando el WebSocket del cliente se desconecta y ya no intentará volver a conectarse.
 *
 * @param erMsg
 * @param code
 */
module.exports = (erMsg, code) => {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
};