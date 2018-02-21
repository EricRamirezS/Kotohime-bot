const commando = require('discord.js-commando');

class RoleCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'rol',
            group: 'admin',
            memberName: 'rol*',
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
        let role;
        let guildMember;
        if (args.accion) {
            try {
                let accion = args.accion.toLowerCase();
                switch (accion) {
                    case "listar":
                        let mensaje = "__Puedes escoger uno o más de los siguientes roles:__\n\n" +
                            "**Danmaku-Ahora**: Para aquellos usuarios que quieren jugar una partida de Danmaku en Tabletop Simulator en este preciso momento.\n" +
                            "**Danmaku-LAS**: Para usuarios que viven en sudamérica\n" +
                            "**Danmaku-EU**:Para usuarios que viven en Europa.\n" +
                            "**Danmaku-LAN**:Para usuarios que viven en Nortemaérica.\n" +
                            "**Danmaku-SEA**:Para usuarios que viven en Asia/Oceania.\n" +
                            "**Danmaku-Preguntar**: Para usuarios que desean jugar una partida en Tabletop Simulator, pero no están seguros si pueden en este precismo momento.\n\n" +
                            "Para adquirir uno de estos roles, utiliza '~rol obtener nombre'\n" +
                            "Para abandonar uno de estos roles, utiliza '~rol abandonar nombre'\n";
                        message.channel.send(mensaje);
                        break;
                    case "obtener":
                        try {
                            let nombreRol = args.Nombre_Rol.toLowerCase();
                            switch (nombreRol) {
                                case "danmaku-las":
                                    role = message.guild.roles.find("id", '415077877470724106');
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.addRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                case "danmaku-lan":
                                    role = message.guild.roles.find("id", '415077773556580353');
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.addRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                case "danmaku-eu":
                                    role = message.guild.roles.find("id", '415077923918446592');
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.addRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                case "danmaku-sea":
                                    role = message.guild.roles.find("id", '415078241087389696');
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.addRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                case "danmaku-preguntar":
                                    role = message.guild.roles.find("id", '415078072593678336');
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.addRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                case "danmaku-ahora":
                                    role = message.guild.roles.find("id", '415078005053063169');
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.addRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                default:
                                    throw new Error();
                            }
                        }
                        catch (e) {
                            console.log(e.toString());
                            message.channel.send("No has ingresado el nombre del rol o el nombre es incorrecto");
                        }
                        break;
                    case "abandonar":
                        try {
                            let nombreRol = args.Nombre_Rol.toLowerCase();
                            switch (nombreRol) {
                                case "danmaku-las":
                                case "danmaku-lan":
                                case "danmaku-eu":
                                case "danmaku-na":
                                case "danmaku-sea":
                                    let mensajeFinal =
                                        nombreRol.split("-")[0].toLowerCase()
                                        +
                                        "-"
                                        +
                                        nombreRol.split("-")[1].toUpperCase();
                                    role = message.guild.roles.find("name", mensajeFinal);
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.removeRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                case "danmaku-preguntar":
                                case "danmaku-ahora":
                                    role = message.guild.roles.find("name", args.Nombre_Rol.toLowerCase());
                                    guildMember = message.guild.members.get(message.author.id + '');
                                    guildMember.removeRole(role).then(function (value) {
                                        message.channel.send(":thumbsup:")
                                    });
                                    break;
                                default:
                                    throw new Error();
                            }
                        }
                        catch (e) {
                            console.log(e.toString());
                            message.channel.send("No has ingresado el nombre del rol o el nombre es incorrecto");
                        }
                        break;
                    default:
                        message.channel.send("La acción ingresada no es valida");
                }
            }
            catch (err) {
                console.log("sad");
            }
        }
    }
}

module.exports = RoleCommand;
