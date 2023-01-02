const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const fs = require('fs');


module.exports = (client) => {
    client.handleCommands = async () => {
        if (fs.existsSync(`./src/commands`)) {
            const commandFolders = fs.readdirSync(`./src/commands`);
            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./src/commands/${folder}`)
                    .filter(file => file.endsWith('.js'));

                const {commands, commandArray} = client;
                for (const file of commandFiles) {
                    if (file.startsWith('_')) continue;
                    const command = require(`../../commands/${folder}/${file}`);
                    command.group = folder;
                    commandArray.push(command.data.toJSON());
                    commands.set(command.data.name, command);
                    console.log(`Command: ${command.data.name} has been passed through the handler.`);
                }
            }

            // noinspection JSClosureCompilerSyntax
            const rest = new REST().setToken(process.env.BOT_TOKEN);

            try {
                console.log('Refreshing application __commands (/)');
                await rest.put(Routes.applicationCommands(
                    process.env.CLIENT_ID), {
                    body: client.commandArray
                });
                console.log('Commands refreshed successfully.');
            } catch (error) {
                console.error(error);
            }
        }
    };
};
