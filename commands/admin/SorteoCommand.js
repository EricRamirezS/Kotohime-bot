const commando = require('discord.js-commando');

class SorteoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sorteo',
            group: 'admin',
            memberName: 'sorteo*',
            description: 'Sorteo de 3 unidades de TTS',
            examples: ['rol listar', 'rol obtener [rol]', 'rol abandonar [rol]'],
            args: [
                {
                    key: 'usuario',
                    prompt: '',
                    type: 'string',
                    default: ''
                }
            ]
            }
        );
    }

    async run(message, args) {
        if (message.member.hasPermission('ADMINISTRATOR') && args.usuario) {
            if (args.usuario) {
                let texto = args.usuario;
                let finalizado = false;
                let arrayOpciones = [];
                let ini = -1;
                let fin = -1;
                while (!finalizado) {
                    ini = -1;
                    fin = -1;
                    for (let i = 0; i < texto.length; i++) {
                        if (texto.charAt(i) === '"') {
                            if (ini === -1) {
                                ini = i;
                            } else {
                                fin = i;
                                break;
                            }
                        }
                    }
                    if (ini === -1 && fin === -1) {
                        finalizado = true;
                    } else {
                        let subStr = texto.substr(ini, fin + 1);
                        texto = texto.replace(subStr, '');
                        subStr = subStr.replace("\" ", "\"");
                        arrayOpciones.push(subStr);
                    }
                }
                let arrayOpciones2 = texto.split(" ");
                for (let i = 0; i < arrayOpciones2.length; i++) {
                    arrayOpciones.push(arrayOpciones2[i])
                }
                for (let i = 0; i < arrayOpciones.length; i++) {
                    if (arrayOpciones[i] === '')
                        arrayOpciones.splice(i, 1);
                }
                let choose = Math.floor(Math.random() * arrayOpciones.length);
                let ganador = arrayOpciones[choose];
                arrayOpciones.splice(choose, 1);
                choose = Math.floor(Math.random() * arrayOpciones.length);
                let ganador2 = arrayOpciones[choose];
                arrayOpciones.splice(choose, 1);
                choose = Math.floor(Math.random() * arrayOpciones.length);
                let ganador3 = arrayOpciones[choose];
                arrayOpciones.splice(choose, 1);

                message.channel.send("¡El primer afortunado en ganar TTS es " + ganador + "!");
                let msg = await message.channel.send("El siguiente ganador se informará en ***5*** minutos.");
                await cuentaRegresiva(msg);

                await message.channel.send("¡El segundo afortunado en ganar TTS es " + ganador2 + "!");
                msg = await message.channel.send("El siguiente ganador se informará en ***5*** minuto.");
                await cuentaRegresiva(msg);

                await message.channel.send("¡El tercer y ultimo afortunado en ganar TTS es " + ganador3 + "!");
                await sleep(5000);
                message.channel.send("¡Felicidades a los ganadores!");
            }
        } else {
            let mensaje = "**¿Te interesa obtener Tabletop Simulator?** ¡Pues tienes la oportunidad de obtenerlo ***gratis***!\n" +
                "Sortearemos 3 Tabletop Simulator para Steam\n" +
                "El sorteo se realizará el ***20 de febrero.***" +
                "\n\n" +
                "Yo estaré a cargo de realizar el sorteo y publicaré el nombre de los ganadores aquí." +
                "\n\n" +
                "¿Cómo participar?\n" +
                "1.- Asegurate de unirte a nuestro grupo en Facebook https://goo.gl/kzKCJf\n" +
                "2.- Comparte el post sobre el sorteo que está en el grupo: https://goo.gl/t7FNaS\n" +
                "4.- Enviar un MP a @Skylur#5684 con tu nombre de Steam y de Facebook." +
                "\n\n" +
                "Debido a las limitaciones regionales de Steam, sólo podrán participar personas residiendo en alguno de los siguientes paises Ecuador, México, Venezuela, Perú, Chile, Argentina, Colombia, Uruguay, Paraguay, Bolivia, El Salvador, Guatemala, Honduras, Nicaragua, Panamá.\n" +
                "\n" +
                "Las personas que ya tengan TTS serán excluidas del sorteo.";
            message.channel.send(mensaje);
        }
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
