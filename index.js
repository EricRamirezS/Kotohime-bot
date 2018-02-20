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

bot2.on('message', function (message) {
    if (message.toString() === 'Muy bien, es hora de comenzar el sorteo, <@387063235821568000> , ¿Me harías los honores?' &&
        message.author.username.toString() === 'Skylur') {
        sorteo(message);
    }
});

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

async function sorteo(message) {
    let channel = message.guild.channels.find("id", "386366248306343937");
    let participantes = [
        '<@391260932006871041>',
        '<@206523987969310722>',
        '<@207892869132976128>',
        '<@385562823528546308>',
        '<@179639887647997963>',
        '<@248800096253247489>',
        '<@232217325707853824>',
        '<@257025937458200576>',
        '<@161594552581357568>',
        '<@221427279258058754>'];
    channel.startTyping();
    await sleep(10000);
    channel.stopTyping(true);
    channel.send("Muy bien " + message.author.toString() + ", comenzaré con los preparativos del sorteo.");
    channel.startTyping();
    await sleep(15000);
    channel.stopTyping(true);
    channel.send("Hey @everyone, (Usando ingles porque discord no tiene un @ todos)\n" +
        "Daremos comienzo al sorteo por 3 TTS, ¿Quiénes podrán ser los afortunados en ganar? <:concern:414776794764279808> \n" +
        "Aún no tengo ni la menor idea de quién se los llevará <:notlikethis:414778768759062528> ");
    channel.startTyping();
    await sleep(15000);
    channel.stopTyping(true);
    let nombreParticipantes = "";
    for (let i = 0; i < participantes.length; i++) {
        nombreParticipantes = nombreParticipantes + ' ' + participantes[i];
    }
    channel.send("A nuestros participantes\n" +
        nombreParticipantes + "\n" +
        "Esten atentos, que cualquiera de ustedes puede uno de los ganadores <:heal:414776769711702027> ");
    shuffle(participantes);
    let largoOriginal = participantes.length;
    let eleccion = Math.floor(getRandomNumber() * participantes.length);
    let ganador = participantes[eleccion];
    participantes.splice(eleccion, 1);

    await sleep(60000);
    channel.startTyping();
    await sleep(7500);
    channel.stopTyping(true);
    channel.send("¡El primer afortunado en ganar TTS es " + ganador + "!");

    sleep(10000).then(async function () {

        channel.send("<:shock:414941160793178112>");

        channel.startTyping();
        await sleep(7000);
        channel.stopTyping(true);

        channel.send("¿Alguno de ustedes esperaba que " + ganador + " fuese el primer afortunado?");

        channel.startTyping();
        await sleep(18000);
        channel.stopTyping(true);

        channel.send("Digo, la probabilidad de que eso ocurriera era de " + (100 / largoOriginal) + "%");

        channel.send("Aunque la probabilidad de que algún participante ganara era de 100% <:eyeyousure:414776794651033620> ");

        channel.startTyping();
        await sleep(20000);
        channel.stopTyping(true);

        channel.send("Ya no sé ni lo que digo <:spoopy:414776794651033600>");

        channel.startTyping();
        await sleep(16000);
        channel.stopTyping(true);

        channel.send("Por cierto, sobre lo ocurrido la otra noche...");
        await sleep(700);
        channel.send("<:gayingensokyo:414776794760216587>");
        channel.startTyping();
        await sleep(25000);
        channel.send("FUE CULPA DE MARISA :japanese_goblin:");
        channel.startTyping();
        await sleep(14000);
        channel.stopTyping(true);
        channel.send("Llegó con unos hongos :mushroom: raros, y convenció a Alice de concinarlos.");
        channel.startTyping();
        await sleep(1100);
        channel.stopTyping(true);
        channel.send("Creo que el aroma que desprendía debió afectarme.");
        channel.send("<:himecry:414783518258888706>");
        await sleep(60000);
        channel.startTyping();
        await sleep(2300);
        channel.stopTyping(true);
        channel.send("<:eeeeeeehhh:414776794537787397>");
        channel.send("<:dodge:414776794579861524>");

    });
    let msg = await channel.send("_\n_\nEl siguiente ganador se informará en ***5*** minutos.\n_\n_");
    await cuentaRegresiva(msg);

    shuffle(participantes);
    eleccion = Math.floor(getRandomNumber() * participantes.length);
    let ganador2 = participantes[eleccion];
    participantes.splice(eleccion, 1);
    await channel.send("¡El segundo afortunado en ganar TTS es " + ganador2 + "!");
    sleep(1000).then(async function () {

        channel.send("<:nani:414776793950715915>");
        channel.startTyping();
        await sleep(2000);
        channel.stopTyping(true);
        channel.send("¡Nunca imaginé que tu serías el siguiente ganador, " + ganador2 + "!.");
        channel.startTyping();
        await sleep(12000);
        channel.stopTyping(true);
        channel.send("Bueno, solo soy un `bot` ¿Siquiera puedo imaginar algo?\n" +
            "Realmente no lo sé <:notlikethis:414778768759062528> ");
        channel.startTyping();
        await sleep(35000);
        channel.stopTyping(true);
        channel.send("<:itsjoke:414776795045560323>\n");
        channel.startTyping();
        await sleep(9000);
        channel.stopTyping(true);
        channel.send("<:spooky:414776796333211668> Bueno, realmente no sé si es una broma...");
        channel.send(":disappointed_relieved:");
        channel.startTyping();
        await sleep(30000);
        channel.stopTyping(true);
        channel.send("En fin... cambiando de tema.");
        channel.startTyping();
        await sleep(15000);
        channel.stopTyping(true);
        channel.send("Sólo falta anunciar a un ganador ¿Quién podrá ser?");
        channel.startTyping();
        await sleep(10000);
        channel.stopTyping(true);
        channel.send("<:SekiThinking:414776794785513484>");
        channel.startTyping();
        await sleep(15000);
        channel.stopTyping(true);
        channel.send("Si quieren ganar, será mejor que comiencen a sobornarme :smirk: ");
        channel.startTyping();
        await sleep(7000);
        channel.stopTyping(true);
        channel.send("Más memoria RAM, un servidor mejor... ya saben, cualquier insumo básico para un bot" +
            " sería un buen *soborno* :keyboard: :floppy_disk: :computer: :printer: ");

    });
    msg = await message.channel.send("_\n_\nEl siguiente ganador se informará en ***5*** minuto.\n_\n_");
    await cuentaRegresiva(msg);

    shuffle(participantes);
    eleccion = Math.floor(getRandomNumber() * participantes.length);
    let ganador3 = participantes[eleccion];
    await channel.send("¡El tercer y ultimo afortunado en ganar TTS es " + ganador3 + "!");
    channel.startTyping();
    await sleep(5000);
    channel.stopTyping(true);
    channel.send("<:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445><:lifestar:414776822270525445>");
    channel.startTyping();
    await sleep(10000);
    channel.stopTyping(true);

    channel.send("El momento de mayor tensión se lo lleva el ultimo ganador, el ultimo premio, todo o nada");
    channel.startTyping();
    await sleep(50000);
    channel.stopTyping(true);
    channel.send(ganador + " " + ganador2 + " " + ganador3 + " ponganse en contacto con <@223614327440146433> para proceder a la recepción del premio.");
}




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cuentaRegresiva(msg) {
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl siguiente ganador se informará en 4 minutos y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 4 minutos y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 4 minutos.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl siguiente ganador se informará en 3 minutos y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 3 minutos y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 3 minutos.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl siguiente ganador se informará en 2 minutos y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 2 minutos y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 2 minutos.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl siguiente ganador se informará en 1 minuto y ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 1 minuto y ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en 1 minuto.\n_\n_");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("_\n_\nEl siguiente ganador se informará en ***" + i + "*** segundos.\n_\n_");
    }
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en ***1*** segundo.\n_\n_");
    await sleep(1000);
    await msg.edit("_\n_\nEl siguiente ganador se informará en ***0*** segundos.\n_\n_");
    return sleep(0);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getRandomNumber() {
    let hrTime = process.hrtime();
    let number = hrTime[0] * 1000000000 + hrTime[1];
    while (number > 1) {
        number /= 10;
    }
    return number
}