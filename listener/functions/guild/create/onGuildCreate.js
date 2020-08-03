const {registerGuild} = require('../../../../db/DBUpdateGuildSetting');

/**
 * Se emite cada vez que el cliente se une a un servidor.
 * @param guild El nuevo servidor
 * @see https://discord.js.org/#/docs/main/stable/class/Guild
 */
module.exports = (guild) => {
    registerGuild(guild.id);
};

