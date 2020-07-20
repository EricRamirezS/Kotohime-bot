const {Client} = require('pg');

const UPDATE_QUERY = 'UPDATE "USUARIO_BANEADO" ' +
    'SET "START_DATE" = to_timestamp($1), ' +
    '"END_DATE" = to_timestamp($2), ' +
    '"BAN_ROLE_ID" = $3, ' +
    '"REASON" = $4, ' +
    '"CURRENTLY_BANNED" = true ' +
    'WHERE "USER_ID" = $5 AND "GUILD_ID" = $6;';
const SELECT_QUERY = "";
const INSERT_QUERY = "";

module.exports = async function ban(user_id, guild_id, inicio, fin, razon, role_id) {
    let con = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await con.connect();

    //UPSERT
    await con.query(UPDATE_QUERY, [inicio, fin, role_id, razon, user_id, guild_id]);
    let res = await con.query(SELECT_QUERY, [user_id, guild_id]);
    if (!res.rowCount) await con.query(INSERT_QUERY, [user_id, guild_id, inicio, fin, razon, role_id]);

    await con.end();
};