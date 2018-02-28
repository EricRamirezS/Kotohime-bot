const Discord = require('discord.js');
const commando = require('discord.js-commando');
const bot = new commando.Client(); //commando bot
const bot2 = new Discord.Client();

bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('misc', 'Misc');
bot.registry.registerGroup('comun', 'Comun');
bot.registry.registerGroup('touhou', 'Touhou');
bot.registry.registerGroup('personalizado', 'Personalizado');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");


bot.on('message',function (message) {
    if (message.author.username.toString()!=='HouraiESP') {
        console.log(message.author.username + ": " + message.toString());
    }
});

var running = false;

bot2.on('message', function (message) {
    if (!running) {
        running = true;
        sorteo(message);
    }
});

async function sorteo(message) {
    let chan = message.guild.channels.find("id", "414736061890166794");
    chan.send("Oops, casi olvido realizar el sorteo del TTS restante que no fue reclamado.");
    chan.startTyping();
    await sleep(17000);
    chan.stopTyping(true);
    chan.send("<@391260932006871041>\n" +
        "<@207892869132976128>\n" +
        "<@221427279258058754>\n" +
        "<@179639887647997963>\n" +
        "<@232217325707853824>");
    chan.send("Pronto anunciaré quién de ustedes se llevará el ultimo TTS que kurousagi no reclamó <:SekiThinking:414776794785513484>\n")
    let msg = await chan.send("_\n_\nEl ganador se informará en ***5*** minutos.\n_\n_");
    await cuentaRegresiva(msg);
    chan.send("Y el ganador de esta segunda vuelta es <@232217325707853824>! <:spring:414776767467880450>\n");
    chan.startTyping();
    await sleep(7500);
    chan.stopTyping(true);
    chan.send("<:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445>\n" +
        "felicidades\n" +
        "<:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445>");
}

bot2.on("guildMemberAdd",function(member){
    let chan = member.guild.channels.find("id","386366248306343937");
    chan.send(member+" se ha unido al servidor.");
});

bot2.on("guildMemberRemove",function(member){
    let chan = member.guild.channels.find("id", "386366248306343937");
    chan.send(member+" ha dejado el servidor.");
});

bot2.on("voiceStateUpdate", function (oldMember, newMember) {
    let chan = newMember.guild.channels.find("id","385996736990281730");
    let nombre = "**"+oldMember.user.username+"**";
    let oldChannel = oldMember.voiceChannelID;
    let newChannel = newMember.voiceChannelID;
    if (oldChannel){
        if(newChannel){
            let oldChannelName = "**"+newMember.guild.channels.find("id",oldChannel+"").name+"**";
            let newChannelName = "**"+newMember.guild.channels.find("id",newChannel+"").name+"**";
            chan.send(nombre+" se ha movido de "+oldChannelName+" a "+newChannelName);
        }else {
            let oldChannelName = "**"+newMember.guild.channels.find("id",oldChannel+"").name+"**";
            chan.send(nombre+" se retiró de "+oldChannelName);
        }
    } else {
        let newChannelName = "**"+newMember.guild.channels.find("id",newChannel+"").name+"**";
        chan.send(nombre+" se unió a "+newChannelName);
    }

});

bot.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    bot.connect();
});

bot2.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    conectarBot2()
});

function conectarBot() {
    bot.login(process.env.BOT_TOKEN1).then(function () {
        console.log("Bot conectado");
        bot.user.setUsername("HouraiESP");
    }).catch(function () {
        console.log("bot no conectado");
        setTimeout(function () {
            console.log("reintentado conectar Bot");
            conectarBot();
        },5000);
    });
}

function conectarBot2() {
    bot2.login(process.env.BOT_TOKEN2).then(function () {
        console.log("Bot2 conectado");
        bot2.user.setUsername("HouraiESP");
    }).catch(function () {
        console.log("bot2 no conectado");
        setTimeout(function () {
            console.log("reintentado conectar Bot");
            conectarBot2();
        },5000);
    });
}

function conectarBots() {

    conectarBot();

    conectarBot2()
}

conectarBots();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cuentaRegresiva(msg) {
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl ganador se informará en 4 minutos y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 4 minutos y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 4 minutos.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl ganador se informará en 3 minutos y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 3 minutos y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 3 minutos.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl ganador se informará en 2 minutos y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 2 minutos y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 2 minutos.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl ganador se informará en 1 minuto y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 1 minuto y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en 1 minuto.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl ganador se informará en ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl ganador se informará en ***0*** segundos.\n_\n_");
    return sleep(0);
}