const fs = require('fs')

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentsFolder = fs.readdirSync(`./src/components`);
        for (const folder of componentsFolder) {
            const componentsFiles = fs.readdirSync(`./src/components/${folder}`)
                .filter(file => file.endsWith('.js'));

            const {buttons, contextMenus, modals, selectMenus} = client;

            switch (folder) {
                case "buttons":
                    for (const file of componentsFiles) {
                        const button = require(`./src/components/${folder}/${file}`)
                        buttons.set(button.data.name, button);
                    }
                    break;
                case "context_menu":
                    for (const file of componentsFiles) {
                        const cm = require(`./src/components/${folder}/${file}`)
                        contextMenus.set(cm.data.name, cm);
                    }
                    break;
                case "modals":
                    for (const file of componentsFiles) {
                        const button = require(`./src/components/${folder}/${file}`)
                        modals.set(button.data.name, button);
                    }
                    break;
                case "select_menu":
                    for (const file of componentsFiles) {
                        const button = require(`./src/components/${folder}/${file}`)
                        selectMenus.set(button.data.name, button);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}