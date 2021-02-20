const commando = require('discord.js-commando');
const imageLinks = [
    "https://cdn.discordapp.com/attachments/386366248306343937/731681950712070214/nueser.jpg",
    "https://cdn.discordapp.com/attachments/386366248306343937/731681458682331267/Every_time_there_is_a_new_user.gif",
    "https://cdn.discordapp.com/attachments/274920985029902336/730448333792870481/Oh_hi_NUE.gif",
    "https://cdn.discordapp.com/attachments/274920985029902336/725697204974780436/Nue_User.png",
];
const {syncGuild, keys} = require('../../db/JSONSListeners');

class NueUserCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'nueuser',
            group: 'danmaku',
            memberName: 'nueuser',
            description: 'Por favor, usame cuando tengamos un nuevo usuario.'
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_danmaku_commands];
        return false;
    }

    async run(message, args){
        let image = Math.floor(Math.random() * imageLinks.length);
        message.channel.send('',{
            files: [
                imageLinks[image]
            ]
        });
    }
}

module.exports = NueUserCommand;
