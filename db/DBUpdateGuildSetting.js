const manual_refresh = require('./JSONSListeners').manualRefresh;
const {Client} = require('pg');

async function registerGuild(guild_id) {
    let q = 'INSERT INTO "GUILD"("GUILD_ID") VALUES($1) ON CONFLICT DO NOTHING';
    await query(q, [guild_id]);
}

async function updateWelcomeChannel(guild_id, channel_id) {
    let q = 'UPDATE "GUILD"' +
        'SET "WELCOME_CHANNEL_ID" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [channel_id, guild_id]);
}

async function updateBanRole(guild_id, role_id) {
    let q = 'UPDATE "GUILD"' +
        'SET "BAN_ROLE_ID" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [role_id, guild_id]);
}

async function updateVoiceLogChannel(guild_id, channel_id) {
    let q = 'UPDATE "GUILD"' +
        'SET "VOICE_LOG_ID" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [channel_id, guild_id]);
}

async function updateBanChannel(guild_id, channel_id) {
    let q = 'UPDATE "GUILD"' +
        'SET "BAN_CHANNEL_ID" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [channel_id, guild_id]);
}

async function updateBanAnnouncementChannel(guild_id, channel_id) {
    let q = 'UPDATE "GUILD"' +
        'SET "BAN_PUBLIC_NOTIFICATION_CHANNEL_ID" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [channel_id, guild_id]);
}

async function updateTouhouCommands(guild_id, allow) {
    let q = 'UPDATE "GUILD"' +
        'SET "ALLOW_TOUHOU_COMMANDS" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [allow, guild_id]);
}

async function updateDanmakuCommands(guild_id, allow) {
    let q = 'UPDATE "GUILD"' +
        'SET "ALLOW_DANMAKU_COMMANDS" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [allow, guild_id]);
}

async function updateGenshinCommands(guild_id, allow) {
    let q = 'UPDATE "GUILD"' +
        'SET "ALLOW_GENSHIN_COMMANDS" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [allow, guild_id]);
}

async function updatePrefix(guild_id, prefix) {
    let q = 'UPDATE "GUILD"' +
        'SET "PREFIX" = $1' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [prefix, guild_id]);
}

async function addRoleToManage(guild_id, role) {
    let q = 'UPDATE "GUILD" ' +
        'SET "ROLES_BOT_CAN_ADD" = array_append("ROLES_BOT_CAN_ADD", $1) ' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [role, guild_id]);
}

async function removeRoleToManage(guild_id, role) {
    let q = 'UPDATE "GUILD" ' +
        'SET "ROLES_BOT_CAN_ADD" = array_remove("ROLES_BOT_CAN_ADD", $1) ' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [role, guild_id]);
}

async function addRolesToManage(guild_id, role) {
    let q = 'UPDATE "GUILD" ' +
        'SET "ROLES_BOT_CAN_ADD" = array_cat("ROLES_BOT_CAN_ADD", $1) ' +
        'WHERE "GUILD_ID" = $2';
    await query(q, [role, guild_id]);
}

async function banUser(user_id, guild_id, inicio, fin, razon, role_id) {
    const UPDATE_QUERY = 'UPDATE "USUARIO_BANEADO" ' +
        'SET "START_DATE" = $1, ' +
        '"END_DATE" = $2, ' +
        '"BAN_ROLE_ID" = $3, ' +
        '"REASON" = $4, ' +
        '"CURRENTLY_BANNED" = true ' +
        'WHERE "USER_ID" = $5 AND "GUILD_ID" = $6;';
    const SELECT_QUERY = 'SELECT * FROM "USUARIO_BANEADO" WHERE "USER_ID" = $1 AND "GUILD_ID" = $2;';
    const INSERT_QUERY = 'INSERT INTO "USUARIO_BANEADO"("USER_ID", "GUILD_ID", "START_DATE", "END_DATE", "REASON", "BAN_ROLE_ID") ' +
        'VALUES($1, $2, $3, $4, $5, $6)';

    let con = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await con.connect();

    inicio = new Date(inicio);
    fin = fin ? new Date(fin) : fin;
    await con.query(UPDATE_QUERY, [inicio, fin, role_id, razon, user_id, guild_id]);
    let res = await con.query(SELECT_QUERY, [user_id, guild_id]);
    if (!res.rowCount) await con.query(INSERT_QUERY, [user_id, guild_id, inicio, fin ? fin : fin, razon, role_id]);

    await con.end();
    refreshData();
}

async function updateBanUser(user_id, guild_id){
    const q = 'UPDATE "USUARIO_BANEADO" ' +
        'SET "CURRENTLY_BANNED" = false ' +
        'WHERE "USER_ID" = $1 AND "GUILD_ID" = $2;';
    await query(q, [user_id, guild_id]);

}

async function query(query, values) {
    let con = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await con.connect();
    await con.query(query, values);
    await con.end();
    refreshData();
}

async function refreshData() {
    let con = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await con.connect();
    let guild_data = await con.query('SELECT * FROM "GUILD"');
    let banned_data = await con.query('SELECT * FROM "USUARIO_BANEADO" where "END_DATE" < current_timestamp AND "CURRENTLY_BANNED"' );
    con.end();
    let guild_values = [];
    for (let i = 0; i < guild_data.rows.length; i++) {
        guild_values.push([
            guild_data.rows[i].GUILD_ID,
            guild_data.rows[i].WELCOME_CHANNEL_ID,
            guild_data.rows[i].BAN_ROLE_ID,
            guild_data.rows[i].VOICE_LOG_ID,
            guild_data.rows[i].ROLES_BOT_CAN_ADD,
            guild_data.rows[i].BAN_CHANNEL_ID,
            guild_data.rows[i].BAN_PUBLIC_NOTIFICATION_CHANNEL_ID,
            guild_data.rows[i].ALLOW_TOUHOU_COMMANDS,
            guild_data.rows[i].ALLOW_DANMAKU_COMMANDS,
            guild_data.rows[i].PREFIX,
            guild_data.rows[i].WELCOME_MESSAGE,
            guild_data.rows[i].ALLOW_GENSHIN_COMMANDS
        ]);
    }
    let banned_values = [];
    for (let i = 0; i < banned_data.rows.length; i++) {
        banned_values.push([
            banned_data.rows[i].ID,
            banned_data.rows[i].USER_ID,
            banned_data.rows[i].GUILD_ID,
            banned_data.rows[i].START_DATE,
            banned_data.rows[i].END_DATE,
            banned_data.rows[i].REASON,
            banned_data.rows[i].CURRENTLY_BANNED,
            banned_data.rows[i].BAN_ROLE_ID,
        ]);
    }

    manual_refresh(guild_values, banned_values);
}

module.exports = {
    registerGuild: registerGuild,
    updateWelcomeChannel: updateWelcomeChannel,
    updateBanRole: updateBanRole,
    updateVoiceLogChannel: updateVoiceLogChannel,
    updateBanChannel: updateBanChannel,
    updateBanAnnouncementChannel: updateBanAnnouncementChannel,
    updateTouhouCommands: updateTouhouCommands,
    updateDanmakuCommands: updateDanmakuCommands,
    updateGenshinCommands,
    updatePrefix: updatePrefix,
    addRoleToManage: addRoleToManage,
    removeRoleToManage: removeRoleToManage,
    addRolesToManage: addRolesToManage,
    unban: updateBanUser,
    ban: banUser
};