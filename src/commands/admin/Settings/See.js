const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction,} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const service = require('../../../service/GuildDataService');

/**
 *
 * @type {{build(SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder, execute(ChatInputCommandInteraction, Client): Promise<*>}}
 */
module.exports = {
    build(builder) {
        builder.setName('see');
        builder.setDescription('Display current configuration for this server');
        builder.addBooleanOption(o => o.setName('public_display')
            .setDescription('Displays the settings for everyone to see'));
        return builder;
    },

    async execute(interaction, client) {
        let data = await service.getGuildData(interaction.guildId);
        let ephemeral = !interaction.options.getBoolean('public_display');

        let embed = new EmbedBuilder();
        let roles = JSON.parse(data.self_assignable_roles);
        roles = sortRoles(interaction.guild, roles);

        roles = roles.length > 0 ? `<@&${roles.join('>\n<@&')}>` : '-';
        let welcomeChannel = data.welcome_channel ? `<#${data.welcome_channel}>` : '-';
        let voiceLogChannel = data.voice_log_channel ? `<#${data.voice_log_channel}>` : '-';
        let djRoles = JSON.parse(data.dj_roles);
        let allowNsfwCommands = data.allow_nsfw_commands ? ':thumbsup:' : ':thumbsdown:';
        djRoles = djRoles.length > 0 ? `<@&${djRoles.join('>\n<@&')}>` : '-';

        await interaction.deferReply({
            ephemeral: ephemeral,
            fetchReply: true
        });

        embed.setTitle('Current setting');
        embed.addFields({
            name: 'Welcome channel:',
            value: welcomeChannel,
            inline: true
        });
        embed.addFields({
            name: 'voice log channel:',
            value: voiceLogChannel,
            inline: true
        });
        embed.addFields({
            name: 'Roles user can add themselves',
            value: roles,
            inline: true
        });
        embed.addFields({
            name: 'Roles can modify playlists',
            value: djRoles,
            inline: true
        });
        embed.addFields({
            name: 'Allow NSFW commands',
            value: allowNsfwCommands,
            inline: true
        });

        return await interaction.editReply({
            embeds: [embed]
        });
    }
};

function sortRoles(guild, roles) {
    let rolesObjects = [];
    for (let role of roles) {
        rolesObjects.push(guild.roles.cache.get(role.id));
    }
    rolesObjects.sort((a, b) => (a.position < b.position) ? 1 : -1);
    return rolesObjects.map(x => x.id);
}