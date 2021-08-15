const {Client} = require('pg');
const { banned_members, banned_keys} = require('./JSONSListeners');

/**
 * Revisa cada 1 minuto por los usuarios baneados en la db que ya han
 * cumplido el periodo de baneo.
 * En caso de encontrar a un usuario que cumpla esta condición, procede
 * a eliminarle el rol de baneado y a actualizar la db
 */
async function checkBan(bot) {
    let values = await banned_members();
    if (values && values.length) {
        let con = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {rejectUnauthorized: false}
        });
        await con.connect();
        for (let i = 0; i < values.length; i++) {
            let guild = bot.guilds.cache.find(x => x.id === values[i][banned_keys.guild_id]);
            let member = guild.members.cache.find(x => x.id === values[i][banned_keys.user_id]);
            let banRole = guild.roles.cache.find(x => x.id === values[i][banned_keys.ban_role_id]);
            if(member) await member.roles.remove(banRole);
            let query = {
                text: 'UPDATE "USUARIO_BANEADO" set "CURRENTLY_BANNED" = false WHERE "USER_ID" = $1 AND "GUILD_ID" = $2;',
                values: [values[i][banned_keys.user_id], values[i][banned_keys.guild_id]]
            };
            await con.query(query.text, query.values);
        }
        await con.end();
    }
}

module.exports = checkBan;
