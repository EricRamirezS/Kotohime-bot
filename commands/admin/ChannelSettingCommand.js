const commando = require('discord.js-commando');
const updateDB = require('../../db/DBUpdateGuildSetting');

class ChannelSettingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'canalconfig',
            group: 'admin',
            memberName: 'canalconfig',
            aliases: ['channel-set', 'channelset', 'canalset', "canal-set", 'canal-config'],
            description: 'Cambia los canales que el bot usará para diversas tareas.\n\n' +
                '__**log-de-usuario**__: Si está configurado, enviaré un mensaje en este canal cada vez que alguien entre' +
                ' o abandone el servidor.\n\n' +
                '__**log-de-voz**__: Si está configurado, enviaré un mensaje en este canal cada vez que alguien se una, ' +
                'se retire o se mueva a un canal de voz.\n\n' +
                '__**anuncio-baneos**__: Si está configurado, y si me utilizas para realizar los baneos a traves de mi ' +
                'función `ban`. Informaré a todos los usuarios que alguien ha sido baneado, los motivos, y la duración del ban.\n\n' +
                '__**prision**__: Si está configurado, y si me utilizas para realizar los baneos a traves de mi ' +
                'función `ban`. Informaré al usuario baneado lo sucedido en este canal.\n' +
                '*Para más detallles sobre mi forma de banear, revisa la ayuda del comando `ban`*',
            examples: ['channel-set anuncio-ban #general', 'channel-set prision #prision'],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'propiedad',
                    prompt: '¿Qué canal deseas modificar?\n\n' +
                        '> log-de-usuarios\n' +
                        '> anuncio-baneos\n' +
                        '> prision\n' +
                        '> log-de-voz\n> ',
                    type: 'string',
                    oneOf: ['log-de-usuarios', 'anuncio-baneos', 'prision', 'log-de-voz']
                },
                {
                    key: 'valor',
                    prompt: '¿Qué canal debo asignar? dejar en blanco para remover esta configuración',
                    type: 'channel',
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) {
        switch (args.propiedad) {
            case 'log-de-usuarios':
                updateDB.updateWelcomeChannel(msg.guild.id, args.valor ? args.valor.id : null)
                    .then(() => {
                        let accion = args.valor ? "actualizada" : "eliminada";
                        msg.reply(`La configuración ha sido ${accion} con exito.`);
                    })
                    .catch(() => {
                        msg.reply("Por alguna razón, no he podido actualizar las configuraciones, si este problema persiste, informale al desarrollador a traves del comandos `feedback`");
                    });
                break;
            case 'anuncio-baneos':
                updateDB.updateBanAnnouncementChannel(msg.guild.id, args.valor ? args.valor.id : null)
                    .then(() => {
                        let accion = args.valor ? "actualizada" : "eliminada";
                        msg.reply(`La configuración ha sido ${accion} con exito.`);
                    })
                    .catch(() => {
                        msg.reply("Por alguna razón, no he podido actualizar las configuraciones, si este problema persiste, informale al desarrollador a traves del comandos `feedback`");
                    });
                break;
            case 'prision':
                updateDB.updateBanChannel(msg.guild.id, args.valor ? args.valor.id : null)
                    .then(() => {
                        let accion = args.valor ? "actualizada" : "eliminada";
                        msg.reply(`La configuración ha sido ${accion} con exito.`);
                    })
                    .catch(() => {
                        msg.reply("Por alguna razón, no he podido actualizar las configuraciones, si este problema persiste, informale al desarrollador a traves del comandos `feedback`");
                    });
                break;
            case 'log-de-voz':
                updateDB.updateVoiceLogChannel(msg.guild.id, args.valor ? args.valor.id : null)
                    .then(() => {
                        let accion = args.valor ? "actualizada" : "eliminada";
                        msg.reply(`La configuración ha sido ${accion} con exito.`);
                    })
                    .catch(() => {
                        msg.reply("Por alguna razón, no he podido actualizar las configuraciones, si este problema persiste, informale al desarrollador a traves del comandos `feedback`");
                    });
                break;
        }
    }
}

function isChannelMention(msg) {
    return msg.startsWith('<#') && msg.endsWith('>');
}

module.exports = ChannelSettingCommand;
