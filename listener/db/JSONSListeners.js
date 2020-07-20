const fetch = require('node-fetch');

let settings = {method: "Get"};
let url_baned = process.env.BANNED_USERS;
let url_guilds = process.env.GUILD_DATA;

var json_baned;
var json_guild;

const keys = {
    guild_id: 0,
    welcome_channel_id: 1,
    ban_role_id: 2,
    voice_log_id: 3,
    roles_bot_can_add: 4,
    ban_channel_id: 5,
    ban_public_notification_channel: 6,
    allow_touhou_commands: 7,
    allow_danmaku_commands: 8,
    prefix: 9
};

const banned_keys = {
    id: 0,
    user_id: 1,
    guild_id: 2,
    start_date: 3,
    end_date: 4,
    reason: 5,
    currently_banned: 6,
    ban_role_id: 7
};

function getBanneds() {
    if (!json_baned) {
        fetch(url_baned, settings)
            .then(res => res.json())
            .then((json) => {
                json_baned = json.values;
            }).catch(e => {
            json_baned = [];
        });
    }
    return json_baned;
}

function getGuilds() {
    if (!json_guild) {
        fetch(url_guilds, settings)
            .then(res => res.json())
            .then((json) => {
                json_guild = json;
            });
    }
    return json_guild;
}

async function getGuild(guild_id) {
    let guild_data = await getGuilds();
    let data;
    if (guild_data) {
        for (let i = 0; i < guild_data.values.length; i++) { //Buscando el canal para log de voz en la guild
            if (guild_data.values[i][keys.guild_id] === guild_id) {
                data = guild_data.values[0];
                break;
            }
        }
    }
    return data;
}

function refresh() {
    fetch(url_baned, settings)
        .then(res => res.json())
        .then((json) => {
            json_baned = json;
        });
    fetch(url_guilds, settings)
        .then(res => res.json())
        .then((json) => {
            json_guild = json;
        });
}

module.exports = {
    banned_members: getBanneds,
    guild: getGuild,
    refresh: refresh,
    keys: keys,
    banned_keys: banned_keys
};