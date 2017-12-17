const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389544268181536769/SSIBPatchouli.jpg",//1
    "https://i.ytimg.com/vi/hUwXUBoPqMk/hqdefault.jpg",
    "https://pre00.deviantart.net/f0a8/th/pre/f/2013/160/5/5/mukyu_by_mazume-d68ddop.jpg",
    "http://dagobah.net/t200/Touhou_Patchouli_Mukyu.jpg",
    "https://vignette.wikia.nocookie.net/touhou/images/4/4d/Mukyu.png",
    "https://img00.deviantart.net/4216/i/2011/233/e/5/patchouli_chuu_by_mazume-d3kp8sc.jpg",
    "https://i.warosu.org/data/jp/img/0095/14/1344197682062.jpg",
    "http://img11.deviantart.net/0e30/i/2013/082/d/e/touhou___patchouli_knowledge_by_kane_neko-d5yyoaz.jpg",
    "https://i.ytimg.com/vi/OExDOinhd1g/maxresdefault.jpg",
    "https://i.imgur.com/1uUz1lN.jpg",
    "http://pre08.deviantart.net/3450/th/pre/f/2011/182/b/7/patchouli_by_primantis-d3hjeav.jpg",
    "https://i.ytimg.com/vi/nIndb1GNeiw/maxresdefault.jpg",
    "https://vignette.wikia.nocookie.net/yukkuri/images/b/bd/Cdf2909c571cd79063bdf52d1a5a959d.jpg",
    "https://i.warosu.org/data/jp/thumb/0109/56/1369732770191s.jpg",
    "https://i.ytimg.com/vi/8ZrNLa8KUrQ/hqdefault.jpg",
    "https://orig00.deviantart.net/025c/f/2010/050/c/4/patchouli_knowledge_touhou_by_peloli.jpg",
    "https://i.pinimg.com/236x/19/b1/90/19b190f027de845087b3954320c497ee--patchouli-knowledge.jpg",
    "https://orig00.deviantart.net/4bfc/f/2010/010/a/3/patchouli_by_selgadis.jpg",
    "https://i.imgur.com/1uUz1lN.jpg",
    "https://78.media.tumblr.com/2508b112d23be50cb94ddf1e6688d1b8/tumblr_opma6eiREI1r9waklo1_400.png",
    "https://78.media.tumblr.com/af4e9d06d9d11b6e7412fbfd2def7999/tumblr_nz5hp1NHtH1tlcrpso1_250.jpg",
    "https://img00.deviantart.net/acb8/i/2016/346/e/b/if_patchouli_was_a_pokemon_by_asteris_kitsy-darftjk.png",
    "https://i.warosu.org/data/jp/img/0145/93/1452391330569.png",
    "https://skycoloreddays.files.wordpress.com/2010/07/3qbf.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/391357921243430922/662786-patchouli_knowledge_332.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/391837308556673026/koakuma_and_patchouli_knowledge_touhou_drawn_by_kan_aaaaari35__sample-dbdc252836b7e50536bca3e9c64713.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/391837455428354068/148884405cc43659a9580069938fee07.png"
];

class MukyuCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'mukyu',
            group: 'touhou',
            memberName: 'mukyu',
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

module.exports = MukyuCommand;
