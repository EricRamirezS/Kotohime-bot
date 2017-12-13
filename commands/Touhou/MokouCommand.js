const commando = require('discord.js-commando');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389543996994748416/VJTUaXB.jpg",//1
    "https://www.walldevil.com/wallpapers/a74/9913-touhou-project-fujiwara-no-mokou.jpg",
    "https://orig00.deviantart.net/dd09/f/2012/168/0/b/touhou__mokou_no_fujiwara_by_clearechoes-d53su7g.png",
    "https://ih1.redbubble.net/image.42004551.1141/flat,800x800,075,t.jpg",
    "https://i.pinimg.com/originals/c2/4f/40/c24f405dd45b6170d16e93c7ec68f7e6.jpg",
    "https://pbs.twimg.com/media/DH7UhopXoAEnwMH.jpg",
    "https://pbs.twimg.com/media/DBcfoU5XUAAa6ZY.jpg",
    "https://pbs.twimg.com/media/C6LgakAWAAAELkk.jpg",
    "https://pbs.twimg.com/media/CxXmVDhUQAEmzuO.jpg",
    "https://pbs.twimg.com/media/C7rHsU9WkAIg-3w.jpg",
    "https://pbs.twimg.com/media/C2c5a2qXgAAHh3c.jpg",
    "https://pbs.twimg.com/media/C29g0jPXgAEiD5R.jpg",
    "https://pbs.twimg.com/media/DQfuqndVwAATYWb.jpg",
    "https://pbs.twimg.com/media/C3qvrggVcAAPSXY.jpg",
    "https://vignette2.wikia.nocookie.net/touhou/images/3/3e/Animal_ears%2Bfujiwara_no_mokou%2Bhouraisan_kaguya%2Binaba_tewi%2Bkamishirasawa_keine%2Bmystia_lorelei%2Breisen_udongein_inaba%2Btouhou%2Byagokoro_eirin.jpg",
    "https://i.pinimg.com/originals/bc/16/f3/bc16f321c5e20ce8c742b6503b8e6e29.jpg",
    "https://pbs.twimg.com/media/DF43sBFXgAAvOZS.jpg",
    "http://i0.kym-cdn.com/photos/images/facebook/000/950/643/0a6.jpg",
    "https://static.zerochan.net/Fujiwara.no.Mokou.full.1565647.jpg",
    "https://static.zerochan.net/Fujiwara.no.Mokou.full.935955.jpg",
    "https://static.giantbomb.com/uploads/original/1/14761/857401-fujiwara_kaguya_26.jpg",
    "http://superwall.us/thumbnail/destroyers_hakutaku_fujiwara_no_mokou_dress-rTCO.jpg",
    "https://i.pinimg.com/originals/70/18/f4/7018f48399114a5a6e225c3f2f1bdbfe.jpg",
    "https://t00.deviantart.net/WeI4dbM3eZ5543WAXnxEK59sefc=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre00/41ba/th/pre/f/2011/127/6/a/keine_grab_my_boobs_by_kodama_sama-d3ftosv.png",
    "https://78.media.tumblr.com/48c06f326825846325b3f7bb3365d348/tumblr_owsu4ytBux1vfessqo2_1280.png"
];

class MokouCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'mokou',
            group: 'touhou',
            memberName: 'mokou',
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

module.exports = MokouCommand;