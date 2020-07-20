const commando = require('discord.js-commando');
const safebooru = require('../../metodosInternos/safebooruImage2Channel').safebooruImageToChannel;

class YuyukoCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'yuyuko',
            group: 'touhou',
            memberName: 'yuyuko',
            description: 'Enviare una imagen de Saigyouji Yuyuko al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    async run(message, args) {
        safebooru(message, "saigyouji_yuyuko");
    }
}

module.exports = YuyukoCommand;