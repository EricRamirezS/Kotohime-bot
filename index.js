const commando = require('discord.js-commando');
const bot = new commando.Client(); //commando bot
const setListenerFunctions = require('./listener/ListenersSet');

const username = "Kotohime";
const avatar = "https://cdn.discordapp.com/attachments/414736061890166794/733025621403500674/Sin_titulo.png";

bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('misc', 'Misc');
bot.registry.registerGroup('comun', 'Comun');
bot.registry.registerGroup('touhou', 'touhou');
bot.registry.registerGroup('danmaku', 'danmaku!!');
bot.registry.registerGroup('nosotros', 'DanmakuESP');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

setListenerFunctions(bot);

function conectarBot() {
    bot.login(process.env.BOT_TOKEN1).then(function () {
        console.log("Bot conectado");
        setDatosBot();
    }).catch(e => {
        console.log("bot no conectado");
        console.log(e);
        setTimeout(function () {
            console.log("reintentado conectar Bot");
            conectarBot();
        },5000);
    });
}

conectarBot();



function setDatosBot() {
    if (bot.user.avatarURL !== avatar) bot.user.setAvatar(avatar).then().catch();
    if (bot.user.username !== username) bot.user.setUsername(username).then().catch();
};