const {getGuildData, getQuickGuildData, refreshGuildData} = require('./functions/GuildData');
const {addOrUpdateSelfAssignableRoles, removeSelfAssignableRoles} = require('./functions/SelfAssignableRoles');
const {addOrUpdateCategory, removeCategory} = require('./functions/Category');
const {disableWelcome, setWelcomeChannel, setWelcomeMessage} = require('./functions/Welcome');
const {disableGoodbye, setGoodbyeChannel, setGoodbyeMessage} = require('./functions/Goodbye');
const {disableVoiceLog, setLogChannelId} = require('./functions/VoiceLog');
const {setLanguage} = require('./functions/Language');
const {setNsfwCommands} = require('./functions/NSFW');
const {addOpenSkillRole, updateOpenSkillInfo} = require('./functions/OpenSkill');
const {addDefaultRoles, removeDefaultRoles} = require('./functions/DefaultRoles')

module.exports = {
    getQuickGuildData,
    refreshGuildData,
    getGuildData,
    addOrUpdateSelfAssignableRoles,
    removeSelfAssignableRoles,
    addOrUpdateCategory,
    removeCategory,
    setWelcomeChannel,
    setWelcomeMessage,
    disableWelcome,
    setGoodbyeChannel,
    setGoodbyeMessage,
    disableGoodbye,
    setLogChannelId,
    disableVoiceLog,
    setLanguage,
    setNsfwCommands,
    addOpenSkillRole,
    updateOpenSkillInfo,
    addDefaultRoles,
    removeDefaultRoles
};