const {SlashCommandSubcommandBuilder, ChatInputCommandInteraction} = require('discord.js');
const {EmbedBuilder} = require('discord.js');

const BATTLE_DECK = require('../../../../dataFiles/DanmakuData/battle_cards.json');
const CHARACTER_DECK = require('../../../../dataFiles/DanmakuData/character_cards.json');
const INCIDENT_DECK = require('../../../../dataFiles/DanmakuData/incident_cards.json');
const LUNATIC_DECK = require('../../../../dataFiles/DanmakuData/lunatic_cards.json');
const ROLE_DECK = require('../../../../dataFiles/DanmakuData/role_cards.json');

const DECKS = {
    BATTLE_DECK: BATTLE_DECK,
    CHARACTER_DECK: CHARACTER_DECK,
    INCIDENT_DECK: INCIDENT_DECK,
    LUNATIC_DECK: LUNATIC_DECK,
    ROLE_DECK: ROLE_DECK
};
const cardTypes = [
    {name: 'BATTLE DECK', value: 'BATTLE_DECK'},
    {name: 'CHARACTER DECK', value: 'CHARACTER_DECK'},
    {name: 'INCIDENT DECK', value: 'INCIDENT_DECK'},
    {name: 'LUNATIC DECK', value: 'INCIDENT_DECK'},
    {name: 'ROLE DECK', value: 'ROLE_DECK'},
];
module.exports = {
    /**
     * @type {SlashCommandSubcommandBuilder}
     */
    build(builder) {
        builder.setName('card');
        builder.setDescription('Display a Danmaku!! Card');
        builder.addStringOption(o => o.setName('name').setDescription('Card Name'));
        builder.addStringOption(o => o.setName('type').setDescription('Card Type').addChoices(...cardTypes));
        return builder;
    },

    /**
     *
     * @param interaction {ChatInputCommandInteraction}
     * @param client {Client}
     * @returns {Promise<void>}
     */
    execute: async function (interaction, client) {
        let name = interaction.options.getString('name');
        let type = interaction.options.getString('type');

        await interaction.deferReply({ephemeral: false});

        let decks = [];

        if (!name && type) decks.push(DECKS[type]);
        else for (let [_, deck] of Object.entries(DECKS)) decks.push(deck);

        let card;
        if (name) {
            searchCard :
                for (let i = 0; i < decks.length; i++) {
                    let deck = decks[i];
                    for (let j = 0; j < deck.length; j++) {
                        if (deck[j].name.toLowerCase().replace(/"/g, '') === name.toLowerCase()) {
                            card = deck[j];
                            break searchCard;
                        }
                    }
                }
        } else {
            let deckTypeIndex = Math.floor(Math.random() * decks.length);
            let cardIndex = Math.floor(Math.random() * decks[deckTypeIndex].length);
            card = decks[deckTypeIndex][cardIndex];
        }

        if (card) {
            interaction.editReply({embeds: [await convertCardToString(card)]});
        } else {
            interaction.editReply({content: 'I couldn\'t find a card.'});
        }
    },
};

function convertCardToString(card) {
    let reply = new EmbedBuilder();
    reply.setTitle(card.name);
    if (BATTLE_DECK.includes(card) || LUNATIC_DECK.includes(card)) {
        if (BATTLE_DECK.includes(card)) reply.setColor('#7C8FD6');
        else reply.setColor('#BD7F36');
        reply.addFields({name: 'Point Value', value: card.point_value, inline: false});
        if (card.timing_a) reply.addFields({name: 'Timing', value: card.timing_a, inline: true});
        if (card.cardTypes_a) reply.addFields({name: 'Type', value: card.cardTypes_a.join(', '), inline: true});
        reply.addFields({name: 'Description', value: card.description_a, inline: false});
        if (card.description_b) {
            if (card.timing_b) reply.addFields({name: 'Timing', value: card.timing_b, inline: true});
            if (card.cardTypes_b) reply.addFields({name: 'Type', value: card.cardTypes_b.join(', '), inline: true});
            reply.addFields({name: 'Description', value: card.description_b, inline: false});
        }
    } else if (CHARACTER_DECK.includes(card)) {
        reply.setColor('#C196CC');
        reply.addFields({name: 'Ability', value: card.ability_description, inline: false});
        reply.addFields({name: 'Spell Card:', value: card.spell_card_name, inline: false});
        if (card.spell_card_timing) reply.addFields({name: 'Timing', value: card.spell_card_timing});
        reply.addFields({name: 'Description:', value: card.spell_card_description, inline: false});

    } else if (INCIDENT_DECK.includes(card)) {
        reply.setColor('#A13D3D');
        reply.addFields({name: 'Description', value: card.description, inline: false});
    } else if (ROLE_DECK.includes(card)) {
        reply.setColor('#959F94');
        reply.addFields({name: 'Type', value: card.type, inline: true});
        if (card.players) reply.addFields({name: 'Number of players', value: card.players, inline: true});
        else reply.addFields({name: 'Number of players', value: '-', inline: true});
        reply.addFields({name: 'Description', value: card.description, inline: false});

    }
    reply.setThumbnail(card.image);
    reply.setURL(card.link);
    reply.setFooter({text: 'See more: ' + card.link.toString(), iconURL: 'https://danmaku.party/favicon.png'});
    return reply;
}