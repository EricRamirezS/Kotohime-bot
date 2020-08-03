const commando = require('discord.js-commando');
const {syncGuild, keys} = require('../../db/JSONSListeners');

const imageLinks = [
    "https://media.discordapp.net/attachments/276329252289511424/389545017712050176/zun-cosplay-1.jpg",//1
    "https://media.discordapp.net/attachments/276329252289511424/389545241973096448/zun_real_life_and_touhou__sample-4bbbd3909cbc2bae7942c1cde6fd9635.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389545251301359623/zun.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/389545478594756609/zun_budweiser_and_real_life__dcf4febe7b10df586bb26aa5e58c71ef.jpg",
    "https://pbs.twimg.com/media/Cd1g2ROUsAANqWg.jpg",
    "https://pre00.deviantart.net/9440/th/pre/i/2013/041/7/8/praise_the_zun__by_raisen_kun-d5uev0q.png",
    "http://dic.nicovideo.jp/oekaki/348226.png",
    "http://www.animemaru.com/wp-content/uploads/2016/05/zun-copy.png",
    "http://touhou.nu/wp/news/thbeer/neko-zun-1.png",
    "https://2eu.funnyjunk.com/comments/Female+zun+you+are+now+happy+_b6e689e1201a627f4aaf68d464ccd998.jpg",
    "https://66.media.tumblr.com/a3d1299416a4abac8fdc759bb85ac355/tumblr_ouhzxgrxYU1r90cnso1_500.jpg",
    "https://cdn.drawception.com/images/panels/2013/8-21/xSwY6dZAyF-2.png",
    "http://i.imgur.com/PQtnIB8.png",
    "https://media.discordapp.net/attachments/276329252289511424/386709403941863437/zun_real_life_and_touhou__sample-64534656572c4512dc63587531eacfb4.jpg",
    "https://pbs.twimg.com/media/C7NZEiDUwAAje-C.jpg",
    "https://media.discordapp.net/attachments/276329252289511424/386709352150597632/143608-ZUNTouhou.jpg",
    "http://i0.kym-cdn.com/photos/images/newsfeed/000/935/103/bb4.jpg",
    "https://img.memecdn.com/zun-and-reimu_o_2809555.jpg",
    "https://66.media.tumblr.com/7fb97ea21d9ae8c9943ca72ee57051e3/tumblr_oi1pwm7nSB1rku2u4o1_1280.png",
    "https://ci.memecdn.com/2907856.gif",
    "https://3.bp.blogspot.com/-slK9jkLy70k/WfeVlas49dI/AAAAAAAAB6o/RfwJeM5Buw0Hi7UKfhW1uLxoWU0kPvkQgCPcBGAYYCw/w1200-h630-p-k-no-nu/meme%2Brandom%2BZUN%2Bgaben%2B21430387_278386552647075_1912859834180494025_n.jpg",
    "https://i.redd.it/ai4cq8fk123z.jpg",
    "https://lh5.googleusercontent.com/-zKdQAXp-y7k/T5nmpNGXvJI/AAAAAAAAAIY/nfFbiJE6-fk/w800-h800/team%2BShanghai%2BAlice.bmp",
    "https://1.bp.blogspot.com/-voRG3CG_DPM/WfeVlR7bN7I/AAAAAAAAB6k/QGG6fAtL1i0TkvazPdEXlr63m2V0CP3WACEwYBhgL/s640/meme%2Brandom%2BZUN%2B21317564_10208048136481710_2536483401783880071_n.jpg",
    "https://en.touhouwiki.net/images/e/eb/ZUNpresentation.jpg",
    "https://safebooru.org//samples/2932/sample_62f9b4c46121821608f3f589fb054a7e60db9462.jpg",
    "https://safebooru.org//samples/2672/sample_67d40656902baaa1bed540b995c6cc057707654a.jpg",
    "https://safebooru.org//samples/2529/sample_3bc63d404013ce83fc7db4a2e44c60c90df092e8.jpg",
    "https://safebooru.org//samples/2231/sample_b291861e69802a1d46c31871df9df25f54120637.jpg",
    "https://safebooru.org//samples/2189/sample_da227b360c5efd8ae7029244e403a48b0f29294b.jpg",
    "https://safebooru.org//samples/2151/sample_f1d9bcd4493a61fc2c8658cbd7b811b971c7e6cb.jpg",
    "https://safebooru.org//images/1917/344150a87deb94e7361618f2c82a4e8a6ff8fcfd.png",
    "https://safebooru.org//images/1829/a037ba46c942418ab882c7d68270c3e91402eb30.jpg",
    "https://safebooru.org//samples/1538/sample_be445953a4aed3989e44d6e32964492dd0a44cb9.jpg",
    "https://safebooru.org//images/1066/23868fd3c8e5aac92a854f9f5152e670505d9b4d.jpg",
    "https://safebooru.org//images/1058/1ebc09671bfe1265a783e569d7583f910427e596.jpg",
    "https://safebooru.org//images/454/690bac79e6997288a694ee85ddb7e30610957f8f.jpg",
    "https://safebooru.org//images/857/8ffb7a9ce0cb37c8c11537cd2bab7920d5c58ab4.png",
    "https://safebooru.org//images/813/9c5e2d2c22efced28e696492142896c46e13f70e.jpg",
    "https://safebooru.org//images/833/fc6faba59837bd7c763e3141f55900295aeb25f6.jpg",
    "https://safebooru.org//images/547/e6c2704ab5e7ff067e9acec03b50370e11f08e68.png",
    "https://safebooru.org//images/488/7b7f02275088c15f4943b95c11595188f8d39f1d.jpg",
    "https://safebooru.org//images/281/8233c562db5e0f6fd46444591f6273bafea2fcf7.jpg",
    "https://safebooru.org//images/136/c0a9eadefc79131fd594cad13a48dc02f3be5162.jpg",
    "https://safebooru.org//images/87/996c3bcd9b496c51d481a7a13a8f47f23ebafa49.jpg",
    "https://safebooru.org//images/75/b6f171125643d00578053f0311324ea7a911bb6b.jpg"

];

class ZunCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'zun',
            group: 'touhou',
            memberName: 'zun',
            description: 'Enviare una imagen de ZUN al azar.',
            clientPermissions: ['ATTACH_FILES']
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_touhou_commands];
        return false;
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

module.exports = ZunCommand;