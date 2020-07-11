const commando = require('discord.js-commando');

class AcercaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sobremi',
            group: 'nosotros',
            memberName: 'sobremi',
            description: '¿Quieres saber sobre mi?',
            examples: ['~sobremi']
            });
    }

    async run(message, args){
        let mensaje = "";
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                mensaje = "¡Hola!\n" +
                    "Así que quieres saber sobre mi, pues no tengo mucho que decir, <:SekiThinking:414776794785513484> " +
                    "despues de todo solo soy una bot.\n" +
                    "Bueno, aquí tienes algo sobre mi";
                break;
            case 1:
                mensaje = "¿Eh?\n" +
                    "¿Que quieres saber sobre mi? <:shock:414941160793178112>\n" +
                    "¿Qué tanto quieres saber? Solo soy un monton de lineas de código corriendo en algún servidor, " +
                    "con muchos cables y corriente moviendose de aquí para allá.\n\n" +
                    "¿No es suficiente con eso? <:notlikethis:414778768759062528>\n" +
                    "Ok, te contaré más sobre mi";
                break;
            case 2:
                mensaje = "11000010 10111111 01010010 01100101 01100001 01101100 01101101 01100101 01101110 01110100 " +
                    "01100101 00100000 01110100 01100101 00100000 01101000 01100001 01110011 00100000 01110100 " +
                    "01101111 01101101 01100001 01100100 01101111 00100000 01101100 01100001 00100000 01101101 " +
                    "01101111 01101100 01100101 01110011 01110100 01101001 01100001 00100000 01100100 01100101 " +
                    "00100000 01100011 01101111 01101110 01110110 01100101 01110010 01110100 01101001 01110010 " +
                    "00100000 01100101 01110011 01110100 01101111 00100000 01100001 00100000 01110100 01100101 " +
                    "01111000 01110100 01101111 00111111 00100000 11000010 10111111 01000011 01101111 01101101 " +
                    "01101111 00100000 01110011 01101001 00100000 01101000 01110101 01100010 01101001 01100101 " +
                    "01110010 01100001 00100000 01100001 01101100 01100111 01101111 00100000 01101001 01101110 " +
                    "01110100 01100101 01110010 01100101 01110011 01100001 01101110 01110100 01100101 00100000 " +
                    "01110011 01101111 01100010 01110010 01100101 00100000 01101101 01101001 00111111 00001010 " +
                    "00001010 01000100 01100101 00100000 01110100 01101111 01100100 01101111 01110011 00100000 " +
                    "01101101 01101111 01100100 01101111 01110011 00101100 00100000 01110100 01100101 00100000 " +
                    "01100100 01100101 01101010 01101111 00100000 01100001 01110001 01110101 11000011 10101101 " +
                    "00100000 01100001 01100010 01100001 01101010 01101111 00100000 01101001 01101110 01100110 " +
                    "01101111 01110010 01101101 01100001 01100011 01101001 11000011 10110011 01101110 00100000 " +
                    "01110011 01101111 01100010 01110010 01100101 00100000 01101101 01101001 00101110";
                break;
            case 3:
                mensaje = "Debo decir que me siento halagada de que tengas interes en mi, pero...\n" +
                    "Solo soy una bot, no puedo corresponder ese interes, lo siento. <:himecry:414783518258888706>\n"
        }


        mensaje+= "\n\nDesarrollador: Skylur (EricRamirezS)\n" +
            "Entorno: Node.JS\n" +
            "Objetivo: Ser el bot amado por todos en Danmaku!! Español\n\n" +
            "No creo tener nada más que decir sobre mi~ \n\n" +
            "Si sabes programar y quieres aportar en mi desarrollo, visita mi código fuente en " +
            "https://github.com/EricRamirezS/Discord-bot-DanmakuESP \n\n" +
            "Adiós <:spoopy:414776794651033600>";

        message.channel.send(mensaje);
    }
}

module.exports = AcercaCommand;
