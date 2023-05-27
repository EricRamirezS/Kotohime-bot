module.exports = (member, message) => {
    const now = new Date();
    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);

    const data = {
        USER_JOINED_DATE: `:t:${member.user.createdTimestamp}:d:`,
        FULL_DATE_TIME: `:t:${utcSecondsSinceEpoch}:F:`,
        DATE_TIME: `:t:${utcSecondsSinceEpoch}:f:`,
        FULL_TIME: `:t:${utcSecondsSinceEpoch}:T:`,
        TIME: `:t:${utcSecondsSinceEpoch}:t:`,
        FULL_DATE: `:t:${utcSecondsSinceEpoch}:D:`,
        DATE: `:t:${utcSecondsSinceEpoch}:d:`,
        RELATIVE_TIME: `:t:${utcSecondsSinceEpoch}:R:`,
        USERNAME: member.user.username,
        USER_MENTION: `<@${member.id}>`,
        GUILD_NAME: member.guild.name
    };

    for (const [key, value] of Object.entries(data)) {
        message = message.replaceAll(`{${key}}`, value);
    }
    return message.replaceAll('\\n', '\n');
};