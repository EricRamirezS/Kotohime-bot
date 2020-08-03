const ban_update = require('../db/DbBanUpdater');
const json_refresh = require('../db/JSONSListeners').refresh;
const { leaveVoiceChannels } = require('./Especial');
let running = false;

async function refresh(callback, bot) {
    ban_update(bot);
    json_refresh();
    leaveVoiceChannels(bot);
    callback(bot);
}

function wait1min(bot) {
    setTimeout(function () {
        refresh(wait1min, bot);
    }, 60000);
}

function START(bot) {
    if (!running) {
        running = true;
        this.bot = bot;
        refresh(wait1min, bot);
    }
}


module.exports = START;