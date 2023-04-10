const {Events, Client, Message} = require('discord.js');
const {refreshGuildData, getGuildData} = require('../../service/GuildDataService');
const service = require('../../service/GuildDataService');
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

module.exports = {
    name: Events.MessageCreate,

    /**
     *
     * @param message {Message}
     * @param client {Client}
     * @return {Promise<void>}
     */
    async execute(message, client) {
        if (!message.guildId) return;

        let data = await service.getGuildData(message.guild.id);
        console.log(data.character_ai_channel)
        if (data.character_ai_channel){
            //replyMessage(message, client)
        }
    }
};

/**
 *
 * @param message {Message}
 * @param client {Client}
 * @return {Promise<void>}
 */
async function replyMessage(message, client) {
    try {
        console.log("A")
        await characterAI.authenticateAsGuest();
        console.log("B")

        const characterId = process.env.CHARACTERAI_ID // Discord moderator
        console.log("C")

        const chat = await characterAI.createOrContinueChat(characterId);
        console.log("D")

        const response = await chat.sendAndAwaitResponse(message.content, false)
        console.log("E")
        await message.reply(response.toString())
        console.log(response);
    } catch (e) {
        console.log(e)
    }
}
