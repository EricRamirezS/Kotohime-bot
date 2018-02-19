const commando = require('discord.js-commando');

class SorteoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sorteo',
            group: 'admin',
            memberName: 'sorteo*',
            description: 'Sorteo de 3 unidades de TTS',
            examples: ['~sorteo'],
            args: []
            }
        );
    }

    async run(message, args) {
            let mensaje = "**¿Te interesa obtener Tabletop Simulator?** ¡Pues tienes la oportunidad de obtenerlo ***gratis***!\n" +
                "Sortearemos 3 Tabletop Simulator para Steam\n" +
                "El sorteo se realizará el ***20 de febrero*** a las **17:00** horas ARG/CHI." +
                "\n\n" +
                "Yo estaré a cargo de realizar y animar el sorteo y publicaré el nombre en #General." +
                "" +
                "\n\n" +
                "¿Cómo participar?\n" +
                "1.- Asegurate de unirte a nuestro grupo en Facebook https://goo.gl/kzKCJf\n" +
                "2.- Comparte el post sobre el sorteo que está en el grupo: https://goo.gl/t7FNaS\n" +
                "4.- Enviar un MP a @Skylur#5684 con tu nombre de Steam y de Facebook." +
                "\n\n" +
                "`Debido a las limitaciones regionales de Steam, sólo podrán participar personas residiendo en alguno de los siguientes paises Ecuador, México, Venezuela, Perú, Chile, Argentina, Colombia, Uruguay, Paraguay, Bolivia, El Salvador, Guatemala, Honduras, Nicaragua, Panamá.`\n" +
                "\n" +
                "Las personas que ya tengan TTS serán excluidas del sorteo.";
            message.channel.send(mensaje);
    }


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cuentaRegresiva(msg) {
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 4 minutos y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 4 minutos y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 4 minutos.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 3 minutos y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 3 minutos y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 3 minutos.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 2 minutos y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 2 minutos y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 2 minutos.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 1 minuto y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 1 minuto y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 1 minuto.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en ***0*** segundos.");
    return new Promise(resolve => {
    });
}
module.exports = SorteoCommand;
