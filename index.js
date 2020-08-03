const commando = require('discord.js-commando');
const bot = new commando.Client(); //commando bot
const setListenerFunctions = require('./listener/ListenersSet');
const refresher = require('./metodosInternos/Refresher');

const avatar = "https://cdn.discordapp.com/avatars/386007907113762816/cb23b22070e056c422074c454bb6f76f.png";

queue = new Map();

bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('misc', 'Misc');
bot.registry.registerGroup('comun', 'Comun');
bot.registry.registerGroup('touhou', 'Touhou');
bot.registry.registerGroup('danmaku', 'Danmaku!!');
bot.registry.registerGroup('nosotros', 'Kotohime BOT!');
bot.registry.registerGroup('musica', 'Música');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

setListenerFunctions(bot);

function conectarBot() {
    bot.login(process.env.BOT_TOKEN1).then(function () {
        console.log("Bot conectado");
        refresher(bot);
    }).catch(e => {
        console.log("bot no conectado");
        console.log(e);
        setTimeout(function () {
            console.log("reintentado conectar Bot");
            conectarBot();
        }, 5000);
    })
}

conectarBot();

bot.on('ready', function () {
    let avatar_code = avatar.split("/").pop().split(".")[0];
    if (bot.user.avatar !== avatar_code) bot.user.setAvatar(avatar);
});