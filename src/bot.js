const {Client, Collection, IntentsBitField, Partials} = require('discord.js');
const {DisTube} = require('distube');
const {SpotifyPlugin} = require('@distube/spotify');
const {YtDlpPlugin} = require('@distube/yt-dlp');

const fs = require('fs');

const token = process.env.BOT_TOKEN;
const functionFolders = fs.readdirSync(`./src/functions`);

global.GUILD_DATA = {};

const myIntents = new IntentsBitField();
myIntents.add(
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildVoiceStates
);
const myPartials = [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User
];

const client = new Client({
    intents: myIntents,
    partials: myPartials,
});

client.distube = new DisTube(client, {
    leaveOnStop: true,
    emitNewSongOnly: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true,
            api: {
                clientId: process.env.SPOTIFY_ID,
                clientSecret: process.env.SPOTIFY_SECRET
            },
        }),
        new YtDlpPlugin()
    ]
});

client.commands = new Collection();

client.buttons = new Collection();
client.contextMenus = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();

client.commandArray = [];

for (let folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

console.log('Database connection successfully established');
client.handleEvents();
client.handleCommands();
client.handleComponents();

client.login(token);
