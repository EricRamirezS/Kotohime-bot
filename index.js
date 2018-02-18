const Discord = require('discord.js');
const commando = require('discord.js-commando');
const bot = new commando.Client();
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
    var chan = member.guild.channels.find("id","386366248306343937");
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
    let channel = message.guild.channels.find("id", "386367860231897088");
    let participantes = [' <@223614327440146433> ', ' <@387063235821568000> ', ' @HouraiESP#7349 ', ' @bastykjhq#4536 '];
    channel.startTyping();
    await sleep(10000);
    channel.stopTyping(true);
    channel.send('Muy bien '+message.author.toString()+', comenzaré con los preparativos del sorteo.');
    channel.startTyping();
    await sleep(15000);
    channel.stopTyping(true);
    channel.send('Hey @everyone, (Usando ingles porque discord no tiene un @ todos)\n' +
        'Daremos comienzo al sorteo por 3 TTS, ¿Quiénes podrán ser los afortunados en ganar? :concern: \n' +
        'Aún no tengo ni la menor idea de quién se los llevará :notlikethis: ');
    channel.startTyping();
    await sleep(15000);
    channel.stopTyping(true);
    let nombreParticipantes = '';
    for (let i = 0; i < participantes.length; i++) {
        nombreParticipantes = nombreParticipantes + ' ' + participantes[i];
    }
    channel.send('A nuestros participantes\n' +
        nombreParticipantes + '' +
        'Esten atentos, que cualquiera de ustedes puede ser el ganador :heal: ');
    shuffle(participantes);
    let largoOriginal = participantes;
    let eleccion = Math.floor(Math.random() * participantes.length);
    let ganador = participantes[eleccion];
    participantes.splice(eleccion, 1);
    eleccion = Math.floor(Math.random() * participantes.length);
    let ganador2 = participantes[eleccion];
    participantes.splice(eleccion, 1);
    eleccion = Math.floor(Math.random() * participantes.length);
    let ganador3 = participantes[eleccion];
    participantes.splice(eleccion, 1);
    channel.send("¡El primer afortunado en ganar TTS es " + ganador + "!");
    sleep(1000).then(async function (value) {

        channel.send(':shock: ');
        channel.startTyping();
        await sleep(3000);
        channel.stopTyping(true);
        channel.send('¿Alguno de ustedes esperaba que ' + ganador + ' fuese el primer afortunado?')

        channel.startTyping();
        await sleep(18000);
        channel.stopTyping(true);
        channel.send('Digo, la probabilidad de que eso ocurriera era de ' + (100 / largoOriginal) + '%');
        channel.startTyping();
        await sleep(4000);
        channel.stopTyping(true);
        channel.send('Aunque la probabilidad de que algún participante ganara era de 100% :eyeyousure: ');
        channel.startTyping();
        await sleep(20000);
        channel.stopTyping(true);
        channel.send('Ya no sé ni lo que digo, así que mejor me cayo hasta que llegue el momento de anunciar al siguiente ganador :spoopy: \n\n' +
            ganador + ' , en cuanto termine el sorteo, ponte en contacto con @Skylur#5684 para proceder a la recepción del premio.');
    });
    let msg = await channel.send("El siguiente ganador se informará en ***5*** minutos.");
    await cuentaRegresiva(msg);

    await message.channel.send("¡El segundo afortunado en ganar TTS es " + ganador2 + "!");
    sleep(1000).then(async function (value) {

        channel.send(' :nani: ');
        channel.startTyping();
        await sleep(2000);
        channel.stopTyping(true);
        channel.send('¡Nunca imaginé que tu serías el siguiente ganador, ' + ganador2 + '!.');
        channel.startTyping();
        await sleep(12000);
        channel.stopTyping(true);
        channel.send('Bueno, solo soy un `bot` ¿Siquiera puedo imaginar algo?\n' +
            'Realmente no lo sé :notlikethis: ');
        channel.startTyping();
        await sleep(11000);
        channel.stopTyping(true);
        channel.send(':itsjoke:');
        channel.startTyping();
        await sleep(9000);
        channel.stopTyping(true);
        channel.send(':spooky: Bueno, realmente no sé si es una broma.');
        channel.send(':disappointed_relieved:');
        channel.startTyping();
        await sleep(30000);
        channel.stopTyping(true);
        channel.send('Creo que... mejor me iré a descansar un momento hasta que tenga que informar sobre el tercer ganador' +
            '... Creo que ya me deprimí... lo siento... :cold_sweat: \n\n' +
            ganador2 + ' , En cuanto termine el sorteo, ponte en contacto con @Skylur#5684 para proceder a la recepción del premio.\'');

    });
    msg = await message.channel.send("El siguiente ganador se informará en ***5*** minuto.");
    await cuentaRegresiva(msg);

    await message.channel.send("¡El tercer y ultimo afortunado en ganar TTS es " + ganador3 + "!");
    channel.startTyping();
    await sleep(5000);
    channel.stopTyping(true);
    message.channel.send(":lifestar: :lifestar: :lifestar: :lifestar: :lifestar: ");
    channel.startTyping();
    await sleep(10000);
    channel.stopTyping(true);

    channel.send('El momento de mayor tensión se lo lleva el ultimo ganador, el ultimo premio, todo o nada\n' +
        '¿Cómo se sintió esa presión ' + ganador3 + ' ?');

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cuentaRegresiva(msg) {
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 4 minutos y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 4 minutos y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 4 minutos.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 3 minutos y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 3 minutos y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 3 minutos.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 2 minutos y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 2 minutos y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 2 minutos.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en 1 minuto y ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 1 minuto y ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en 1 minuto.");
    for (let i = 59; i > 1; i--) {
        await sleep(1000);
        await msg.edit("El siguiente ganador se informará en ***" + i + "*** segundos.");
    }
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en ***1*** segundo.");
    await sleep(1000);
    await msg.edit("El siguiente ganador se informará en ***0*** segundos.");
    return new Promise(resolve => {
    });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
