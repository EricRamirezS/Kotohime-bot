
const {ShardingManager} = require('discord.js');
const sequelize = require('./db/database');
require('./db/models/_modelInitializer');

sequelize.sync({alter: true})
    .then(() => {

        const manager = new ShardingManager('./src/bot.js', {token: process.env.BOT_TOKEN});

        manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

        manager.spawn();
    })
    .catch((err) => console.error('Failed to establish connection to database: ', err));