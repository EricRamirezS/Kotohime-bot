const lf = require('./listenersFunction');

/**
 * Registra las funciones por evento al bot
 * @param bot Cliente
 */
module.exports = (bot) => {

    bot.on('channelCreate', (channel) => lf.channelCreate(channel));
    bot.on('channelDelete', (channel) => lf.channelDelete(channel));
    bot.on('channelPinsUpdate', (channel, time) => lf.channelPinsUpdate(channel, time));
    bot.on('channelUpdate', (oldChannel, newChannel) => lf.channelUpdate(oldChannel, newChannel));
    bot.on('clientUserGuildSettingsUpdate', (clientUserGuildSettings) => lf.clientUserGuildSettingsUpdate(clientUserGuildSettings));
    bot.on('clientUserSettingsUpdate', (clientUserSettings) => lf.clientUserSettingsUpdate(clientUserSettings));
    bot.on('debug', (info) => lf.debug(info));
    bot.on('disconnect', (erMsg, code) => lf.disconnect(erMsg, code));
    bot.on('emojiCreate', (emoji) => lf.emojiCreate(emoji));
    bot.on('emojiDelete', (emoji) => lf.emojiDelete(emoji));
    bot.on('emojiUpdate', (oldEmoji, newEmoji) => lf.emojiUpdate(oldEmoji, newEmoji));
    bot.on('error', (error) => lf.error(error));
    bot.on('guildBanAdd', (guild, user) => lf.guildBanAdd(guild, user));
    bot.on('guildBanRemove', (guild, user) => lf.guildBanRemove(guild, user));
    bot.on('guildCreate', (guild) => lf.guildCreate(guild));
    bot.on('guildDelete', (guild) => lf.emojiDelete(guild));
    bot.on("guildMemberAdd", (member) => lf.guildMemberAdd(member));
    bot.on('guildMemberAvailable', (member) => lf.guildMemberAvailable(member));
    bot.on("guildMemberRemove", (member) => lf.guildMemberRemove(member));
    bot.on("guildMembersChunk", (members, guild) => lf.guildMembersChunk(members, guild));
    bot.on('guildMemberSpeaking', (member, speaking) => lf.guildMemberSpeaking(member, speaking));
    bot.on('guildMemberUpdate', (oldMember, newMember) => lf.guildMemberUpdate(oldMember, newMember));
    bot.on('guildUnavailable', (guild) => lf.guildUnavailable(guild));
    bot.on('guildUpdate', (oldGuild, newGuild) => lf.guildUpdate(oldGuild, newGuild));
    bot.on('message', (message) => lf.message(message));
    bot.on('messageDelete', (message) => lf.messageDelete(message));
    bot.on('messageDeleteBulk', (messages) => lf.messageDeleteBulk(messages));
    bot.on('messageReactionAdd', (messageReaction, user) => lf.messageReactionAdd(messageReaction, user));
    bot.on('messageReactionRemove', (messageReaction, user) => lf.messageReactionRemove(messageReaction, user));
    bot.on('messageReactionRemoveAll', (message) => lf.messageReactionRemoveAll(message));
    bot.on('messageUpdate', (oldMessage, newMessage) => lf.messageUpdate(oldMessage, newMessage));
    bot.on('presenceUpdate', (oldMember, newMember) => lf.presenceUpdate(oldMember, newMember));
    bot.on('ready', () => lf.ready());
    bot.on('reconnecting', () => lf.reconnecting());
    bot.on('resume', (replayed) => lf.resume(replayed));
    bot.on('roleCreate', (role) => lf.roleCreate(role));
    bot.on('roleDelete', (role) => lf.roleDelete(role));
    bot.on('roleUpdate', (oldRole, newRole) => lf.roleUpdate(oldRole, newRole));
    bot.on('typingStart', (channel, user) => lf.typingStart(channel, user));
    bot.on('typingStop', (channel, user) => lf.typingStop(channel, user));
    bot.on('userNoteUpdate', (user, oldNote, newNote) => lf.userNoteUpdate(user, oldNote, newNote));
    bot.on('userUpdate', (oldUser, newUser) => lf.userUpdate(oldUser, newUser));
    bot.on("voiceStateUpdate", (oldMember, newMember) => lf.voiceStateUpdate(oldMember, newMember));
    bot.on('warn', (info) => lf.warn(info));

};