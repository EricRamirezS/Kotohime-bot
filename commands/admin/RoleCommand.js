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

    async run(message, args){
        try{
            var accion = args.accion.toLowerCase();
            switch (accion){
                case "listar":
                    var mensaje = "__Puedes escoger uno o más de los siguientes roles:__\n\n" +
                        "**Danmaku-Ahora**: Para aquellos usuarios que quieren jugar una partida de Danmaku en Tabletop Simulator en este preciso momento.\n" +
                        "**Danmaku-Sudamerica**: Para usuarios que viven en sudamérica\n" +
                        "**Danmaku-Europa**:Para usuarios que viven en Europa.\n" +
                        "**Danmaku-Norteamerica**:Para usuarios que viven en Nortemaérica.\n" +
                        "**Danmaku-Preguntar**: Para usuarios que desean jugar una partida en Tabletop Simulator, pero no están seguros si pueden en este precismo momento.\n\n" +
                        "Para adquirir uno de estos roles, utiliza '~rol obtener nombre'\n" +
                        "Para abandonar uno de estos roles, utiliza '~rol abandonar nombre'\n";
                    message.channel.send(mensaje);
                    break;
                case "obtener":
                    try{
                        var nombreRol = args.Nombre_Rol.toLowerCase();
                        switch (nombreRol) {
                            case "danmaku-ahora":
                            case "danmaku-sudamerica":
                            case "danmaku-europa":
                            case "danmaku-norteamerica":
                            case "danmaku-preguntar":
                                var mensajeFinal =
                                    nombreRol.split("-")[0].charAt(0).toUpperCase()
                                    +
                                    nombreRol.split("-")[0].slice(1)
                                    +
                                    "-"
                                    +
                                    nombreRol.split("-")[1].charAt(0).toUpperCase()
                                    +
                                    nombreRol.split("-")[1].slice(1);
                                var role = message.guild.roles.find("name",mensajeFinal);
                                var guildMember = message.guild.members.get(message.author.id+'');
                                guildMember.addRole(role);
                                message.channel.send(":thumbsup:");
                                break;
                            default: throw new Error();
                        }
                    }
                    catch (e){
                        console.log(e.toString());
                        message.channel.send("No has ingresado el nombre del rol o el nombre es incorrecto");
                    }
                    break;
                case "abandonar": try{
                    var nombreRol = args.Nombre_Rol.toLowerCase();
                    switch (nombreRol) {
                        case "danmaku-ahora":
                        case "danmaku-sudamerica":
                        case "danmaku-europa":
                        case "danmaku-norteamerica":
                        case "danmaku-preguntar":
                            var mensajeFinal =
                                nombreRol.split("-")[0].charAt(0).toUpperCase()
                                +
                                nombreRol.split("-")[0].slice(1)
                                +
                                "-"
                                +
                                nombreRol.split("-")[1].charAt(0).toUpperCase()
                                +
                                nombreRol.split("-")[1].slice(1);
                            var role = message.guild.roles.find("name",mensajeFinal);
                            var guildMember = message.guild.members.get(message.author.id+'');
                            guildMember.removeRole(role);
                            message.channel.send(":thumbsup:");
                            break;
                        default: throw new Error();
                    }
                }
                catch (e){
                    console.log(e.toString());
                    message.channel.send("No has ingresado el nombre del rol o el nombre es incorrecto");
                }break;
                default: message.channel.send("La acción ingresada no es valida");
            }
        }
        catch (err){
            console.log("sad");
        }
    }
}

module.exports = RoleCommand;