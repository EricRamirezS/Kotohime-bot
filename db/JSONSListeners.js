const fetch = require('node-fetch');

let settings = {method: "Get"};
let url_baned = process.env.BANNED_USERS;
let url_guilds = process.env.GUILD_DATA;

let json_baned = [];
let json_guild = [];
let manual_update = false;

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
    prefix: 9,
    welcome_message: 10,
    allow_genshin_commands: 11,
    allow_anime_commands: 12,
    allow_nsfw_commands: 13,
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

async function getBanneds() {
    if (!json_baned) {
        await fetch(url_baned, settings)
            .then(res => res.json())
            .then((json) => {
                json_baned = json.values;
            }).catch(() => {
                json_baned = [];
            });
    }
    return json_baned;
}

async function getGuilds() {
    if (!json_guild) {
        await fetch(url_guilds, settings)
            .then(res => res.json())
            .then((json) => {
                json_guild = json.values;
            });
    }
    return json_guild;
}

function getSyncBanneds() {
    return json_baned;
}

/**
 * Entrega la información sobre la guild si esta está almacenada en la variable
 * en caso contrario, entrega null.
 * Recomendado para funciones no compatibles con funciones async.
 * @param guild_id id de la guild cuyos datos se consultan
 * @returns {null}
 */
function getSyncGuild(guild_id) {
    let data = null;
    if (json_guild) {
        for (let i = 0; i < json_guild.length; i++) {
            if (json_guild[i][keys.guild_id] === guild_id) {
                data = json_guild[i];
                break;
            }
        }
    }
    return data;
}

async function getGuild(guild_id) {
    let guild_data = await getGuilds();
    let data;
    if (guild_data) {
        for (let i = 0; i < guild_data.length; i++) {
            if (guild_data[i][keys.guild_id] === guild_id) {
                data = guild_data[i];
                break;
            }
        }
    }
    if (!data) {
        return [];
    }
    return data;
}

/**
 * Debido a que los JSONS de dataclip se actualizan cada 1 minuto, puede generar desfase con la
 * información real de la base de datos, por tanto, si se ha hecho una transacción conocida a la db,
 * esta se actualizará manualmente, y se dejará de consultar al JSON por 1-2 minutos
 * @param guild_data
 * @param banned_data
 * @returns {Promise<void>}
 */
const manualRefresh = async function manualRefresh(guild_data, banned_data) {
    json_guild = guild_data;
    json_baned = banned_data;
    manual_update = true;
}

async function refresh() {
    if (!manual_update) {
        fetch(url_baned, settings)
            .then(res => res.json())
            .then((json) => {
                json_baned = json.values;
            }).catch(() => {/*DO NOTHING*/
        });
        fetch(url_guilds, settings)
            .then(res => res.json())
            .then((json) => {
                json_guild = json.values;
            }).catch(() => {/*DO NOTHING*/
        });
    } else {
        manual_update = !manual_update;
    }
}


module.exports = {
    banned_members: getBanneds,
    syncBanned: getSyncBanneds,
    guild: getGuild,
    syncGuild: getSyncGuild,
    refresh: refresh,
    manualRefresh,
    keys: keys,
    banned_keys: banned_keys,
};
