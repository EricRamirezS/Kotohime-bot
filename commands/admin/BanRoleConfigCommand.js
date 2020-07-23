const commando = require('discord.js-commando');
const updateDB = require('../../listener/db/DBUpdateGuildSetting');

class BanRoleConfigCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'banrolconfig',
            group: 'admin',
            memberName: 'banroleconfig',
            description: 'Cambiar las configuraciones del comando ban.\n\n' +
                '__**rol**__: Utilizaré este rol para "banear" usuarios, si no me especificas ninguno, la función de ban ' +
                'será deshabilitada.\n' +
                '*Asegurate de configurar el rol apropiadamente con las limitaciones que un usuario baneado debe tener ' +
                'dentro del servidor.*',
            examples: ['banroleconfig rol @ban', 'banroleconfig prision #prision'],
            aliases: ['banroleconfig', 'banconfig', 'ban-rol-config', 'ban-role-config', 'banroleset', 'ban-role-set'],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'rol',
                    prompt: '¿Cuál es el nuevo rol?',
                    type: 'role',
                    default: ''
                }
            ]
        });
    }

    async run(message, args) {
        updateDB.updateBanRole(message.guild.id, args.rol ? args.rol.id : null).then(() => {
            message.reply(`La configuración ha sido ${args.rol ? "actualizada" : "eliminada"} con exito.`);
        }).catch(() => {
            message.reply("Por alguna razón, no he podido actualizar las configuraciones, si este problema persiste, " +
                "informale al desarrollador a traves del comandos `feedback`");
        });
    }
}

module.exports = BanRoleConfigCommand;
