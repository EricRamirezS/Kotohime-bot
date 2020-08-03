const commando = require('discord.js-commando');
const {guild, keys} = require('../../db/JSONSListeners');

class RoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rol',
            group: 'admin',
            memberName: 'rol*',
            aliases: ['role'],
            description: 'Asignar o abandonar un rol',
            examples: ['rol listar', 'rol obtener [rol]', 'rol abandonar [rol]'],
            clientPermissions: ['MANAGE_ROLES'],
            args: [
                {
                    key: 'accion',
                    prompt: '¿Qué desea hacer?',
                    type: 'string',
                    default: "listar"
                }
                ,
                {
                    key: 'Nombre_Rol',
                    prompt: '¿Nombre Rol?',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }

    async run(message, args) {
        let guild_data = await guild(message.guild.id);
        if (guild_data) {
            switch (args.accion) {
                case 'listar':
                    listar(message, guild_data[keys.roles_bot_can_add]);
                    break;
                case 'obtener':
                    obtenerOabandonar(message, args.Nombre_Rol, guild_data[keys.roles_bot_can_add]);
                    break;
                case 'abandonar':
                    obtenerOabandonar(message, args.Nombre_Rol, guild_data[keys.roles_bot_can_add], false);
                    break;
                default:
                    message.channel.send("La acción ingresada no es valida.");
                    break;

            }
        }
    }
}

module.exports = RoleCommand;

function listar(message, roles) {
    let respuesta = "Lo siento, no hay roles que pueda asignarte en este servidor.";
    if (roles) {
        respuesta = "Puedes escoger uno o más de los siguientes roles:\n";
        let example = "";
        for (let i = 0; i < roles.length; i++) {
            let role = message.guild.roles.cache.find(x => x.id === roles[i]);
            if (role) {
                respuesta += "\n**" + role.name + "**";
                example = role.name;
            }
        }
        respuesta += "\n\nPara adquirir uno de estos roles, utiliza `~rol obtener [nombre]`\n";
        respuesta += "Para abandonar uno de estos roles, utiliza `~rol abandonar nombre`\n";
        respuesta += "\nPor ejemplo `~role obtener " + example + "`";
    }
    message.channel.send(respuesta);
}

function obtenerOabandonar(message, role_name, roles, obtener = true) {
    let rol_soli = message.guild.roles.cache.find(x => x.name.toLowerCase() === role_name.toLowerCase());
    let flag = false;
    if (rol_soli) {
        for (let i = 0; i < roles.length; i++) {
            flag = rol_soli.id === roles[i];
            if (flag) break;
        }
    }
    if (flag) {
        if (obtener) {
            message.member.roles.add(rol_soli).then(function (value) {
                message.channel.send(":thumbsup:")
            });
        } else {
            message.member.roles.remove(rol_soli).then(function (value) {
                message.channel.send(":thumbsup:")
            });
        }
    } else {
        message.channel.send("No he encontrado el rol que has solicitado.");
    }
}