const commando = require('discord.js-commando');
const {guild, keys} = require('../../listener/db/JSONSListeners');

class RoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rol',
            group: 'admin',
            memberName: 'rol*',
            aliases: ['role'],
            description: 'Asignar o abandonar un rol',
            examples: ['rol listar', 'rol obtener [rol]', 'rol abandonar [rol]'],
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
        let guild = await guild(message.guild.id);
        if (guild) {
            switch (args.accion) {
                case 'listar':
                    listar(message, guild[keys.roles_bot_can_add]);
                    break;
                case 'obtener':
                    obtenerOabandonar(message, args.Nombre_Rol, guild[keys.roles_bot_can_add]);
                    break;
                case 'abandonar':
                    obtenerOabandonar(message, args.Nombre_Rol, guild[keys.roles_bot_can_add], false);
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
            message.member.addRole(rol_soli).then(function (value) {
                message.channel.send(":thumbsup:")
            });
        } else {
            message.member.removeRole(rol_soli).then(function (value) {
                message.channel.send(":thumbsup:")
            });
        }
    } else {
        message.channel.send("No he encontrado el rol que has solicitado.");
    }
}

// if (args.accion) {
//     try {
//         let accion = args.accion.toLowerCase();
//         switch (accion) {
//             case "listar":
//                 let mensaje = "__Puedes escoger uno o más de los siguientes roles:__\n\n" +
//                     "**Danmaku-Ahora**: Para aquellos usuarios que quieren jugar una partida de Danmaku en Tabletop Simulator en este preciso momento.\n" +
//                     "**Danmaku-LAS**: Para usuarios que viven en sudamérica\n" +
//                     "**Danmaku-EU**:Para usuarios que viven en Europa.\n" +
//                     "**Danmaku-LAN**:Para usuarios que viven en Nortemaérica.\n" +
//                     "**Danmaku-SEA**:Para usuarios que viven en Asia/Oceania.\n" +
//                     "**Danmaku-Preguntar**: Para usuarios que desean jugar una partida en Tabletop Simulator, pero no están seguros si pueden en este precismo momento.\n\n" +
//                     "Para adquirir uno de estos roles, utiliza '~rol obtener nombre'\n" +
//                     "Para abandonar uno de estos roles, utiliza '~rol abandonar nombre'\n";
//                 message.channel.send(mensaje);
//                 break;
//             case "obtener":
//                 try {
//                     let nombreRol = args.Nombre_Rol.toLowerCase();
//                     switch (nombreRol) {
//                         case "danmaku-las":
//                             role = message.guild.roles.find("id", '415077877470724106');
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.addRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         case "danmaku-lan":
//                             role = message.guild.roles.find("id", '415077773556580353');
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.addRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         case "danmaku-eu":
//                             role = message.guild.roles.find("id", '415077923918446592');
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.addRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         case "danmaku-sea":
//                             role = message.guild.roles.find("id", '415078241087389696');
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.addRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         case "danmaku-preguntar":
//                             role = message.guild.roles.find("id", '415078072593678336');
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.addRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         case "danmaku-ahora":
//                             role = message.guild.roles.find("id", '415078005053063169');
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.addRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         default:
//                             throw new Error();
//                     }
//                 } catch (e) {
//                     console.log(e.toString());
//                     message.channel.send("No has ingresado el nombre del rol o el nombre es incorrecto");
//                 }
//                 break;
//             case "abandonar":
//                 try {
//                     let nombreRol = args.Nombre_Rol.toLowerCase();
//                     switch (nombreRol) {
//                         case "danmaku-las":
//                         case "danmaku-lan":
//                         case "danmaku-eu":
//                         case "danmaku-na":
//                         case "danmaku-sea":
//                             let mensajeFinal =
//                                 nombreRol.split("-")[0].toLowerCase()
//                                 +
//                                 "-"
//                                 +
//                                 nombreRol.split("-")[1].toUpperCase();
//                             role = message.guild.roles.find("name", mensajeFinal);
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.removeRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         case "danmaku-preguntar":
//                         case "danmaku-ahora":
//                             role = message.guild.roles.find("name", args.Nombre_Rol.toLowerCase());
//                             guildMember = message.guild.members.get(message.author.id + '');
//                             guildMember.removeRole(role).then(function (value) {
//                                 message.channel.send(":thumbsup:")
//                             });
//                             break;
//                         default:
//                             throw new Error();
//                     }
//                 } catch (e) {
//                     console.log(e.toString());
//                     message.channel.send("No has ingresado el nombre del rol o el nombre es incorrecto.");
//                 }
//                 break;
//             case "color":
//                 let adminRole = message.guild.roles.find('id', '385995520251789313');
//                 if (message.member.roles.has(adminRole.id)) {
//                     try {
//                         let role = message.guild.roles.find('id', args.Nombre_Rol);
//                         role.setColor(args.color)
//                     } catch (err) {
//                         message.channel.send("Ha ocurrido un error.")
//                     }
//                 } else {
//                     message.channel.send("No tienes permisos para administrar los colores de rol.");
//                 }
//                 break;
//             default:
//                 message.channel.send("La acción ingresada no es valida.");
//         }
//     } catch (err) {
//         console.log("sad");
//     }