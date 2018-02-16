const commando = require('discord.js-commando');
const fs = require('fs');

var participantes = {};

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
                    key: 'accion',
                    prompt: '¿Qué desea hacer?',
                    type: 'string',
                    default: ''
                }
                ,
                {
                    key: 'usuario',
                    prompt: '¿Qué desea hacer?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(message, args) {
        if (message.member.hasPermission('ADMINISTRATOR') && args.accion) {
            if (args.accion === 'registrar' && args.usuario) {
                participantes.push(usuario);
            }
            if (args.accion === 'sortear') {
                let i = Math.floor(Math.random() * participantes.length);
                message.channel.send(participantes[i]);
                participantes.splice(i, 1);
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

function writeData(savPath, srcPath, newData) {
    fs.readFile(srcPath, 'utf8', function (err, data) {
        if (err) throw err;
        //Do your processing, MD5, send a satellite to the moon, etc.
        fs.writeFile(savPath, data + '\n' + newData, function (err) {
            if (err) throw err;
            console.log('complete');
        });
    });
}

module.exports = SorteoCommand;
