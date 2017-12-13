const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389542662795034626/RemiMFW.jpg",//1
    "http://www.legion34.com/wp-content/uploads/2013/05/s-105191-___-3girls-bat_wings-beans-belt-blue_hair-chain-closed_eyes-_d-dawy-fangs-hat-horns-ibuki_sui.png",
    "https://vignette.wikia.nocookie.net/yukkuri/images/e/e0/Remiria.png",
    "https://orig00.deviantart.net/033f/f/2013/109/b/9/touhou___chibi_flandre_scarlet_by_kane_neko-d628jos.png",
    "http://www.legion34.com/wp-content/uploads/2013/05/Remilia-3.jpg",
    "http://www.legion34.com/wp-content/uploads/2013/05/Remilia-1.jpg",
    "https://t00.deviantart.net/K65MZdZyiZdy5M-MoNQakMN1Woc=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/43fb/th/pre/f/2010/142/4/0/touhou___sakuya_n_remilia_by_shiranaiyo6927.jpg",
    "https://en.touhouwiki.net/images/f/f7/SSiBRemilia.jpg",
    "https://t00.deviantart.net/2VQNF6OhIsbrTqBa20LHQNPwvpo=/300x200/filters:fixed_height(100,100):origin()/pre00/16cd/th/pre/i/2010/364/5/6/little_scarlet__s__vampires_by_hecoheio-d360rj6.jpg",
    "https://i.ytimg.com/vi/bEANxX98aZ0/hqdefault.jpg",
    "https://pbs.twimg.com/media/DQVGtVTWsAA8--z.jpg",
    "https://pbs.twimg.com/media/DQPfaJuXkAApbkK.jpg",
    "https://pbs.twimg.com/media/DQS2tHdWkAAZUhI.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389307458268430356/c7c.png",
    "https://media.discordapp.net/attachments/276329252289511424/389215741527851009/56648187_p0.png",
    "https://static.zerochan.net/Touhou.full.1158763.jpg",
    "https://i.pinimg.com/736x/cc/89/8f/cc898fd75d0097eed00399cfd1425f02--illusion-flandre.jpg",
    "https://vignette.wikia.nocookie.net/touhou/images/6/6b/Flan-Remi_gif.gif",
    "https://media.discordapp.net/attachments/276329252289511424/389215711140118528/unknown.png",
    "http://i.imgur.com/UFGwAbM.png",
    "https://media.tenor.com/images/73c04ccbab4000812570c65917bce7ea/tenor.gif",
    "http://images.wikia.com/yukkuri/images/9/92/BodiedYukkuriRemilia.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/386797915437269003/11f670a6b25bc9aa0eaf4ef6034b18f1.jpg"
];

class UuuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'uuu',
            group: 'touhou',
            memberName: 'uuu',
            description: ''
        });
    }

    async run(message, args){
        var image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = UuuCommand    ;