const commando = require('discord.js-commando');
const BATTLE_DECK = require('../../dataFiles/DanmakuData/battle_cards.json');
const CHARACTER_DECK = require('../../dataFiles/DanmakuData/character_cards.json');
const INCIDENT_DECK = require('../../dataFiles/DanmakuData/incident_cards.json');
const LUNATIC_DECK = require('../../dataFiles/DanmakuData/lunatic_cards.json');
const ROLE_DECK = require('../../dataFiles/DanmakuData/role_cards.json');
const {stripIndents} = require('common-tags');
const Discord = require('discord.js');
const {syncGuild, keys} = require('../../db/JSONSListeners');


class CardCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'carta',
            group: 'danmaku',
            memberName: 'carta',
            aliases: ['card'],
            description: '¿Quieres ver información de alguna carta??',
            args: [
                {
                    key: 'Nombre_Carta',
                    prompt: '¿Qué carta debo buscar?',
                    type: 'string',
                }
            ]
        });
    }

    hasPermission(msg) {
        let guild_data = syncGuild(msg.guild.id);
        if (guild_data) return guild_data[keys.allow_danmaku_commands];
        return false;
    }

    async run(message, args) {
        console.log(args.Nombre_Carta);
        if (args.Nombre_Carta) {
            let decks = [BATTLE_DECK, CHARACTER_DECK, INCIDENT_DECK, LUNATIC_DECK, ROLE_DECK];
            let foundCard;
            searchCard :
                for (let i = 0; i < decks.length; i++) {
                    let deck = decks[i];
                    for (let j = 0; j < deck.length; j++) {
                        if (deck[j].name.toLowerCase().replace(/"/g, "") === args.Nombre_Carta.toLowerCase()) {
                            foundCard = deck[j];
                            break searchCard;
                        }
                    }
                }
            if (foundCard) {
                message.channel.send(this.convertCardToString(foundCard));
            } else {
                message.channel.send("No he encontrado ninguna carta con ese nombre.");
            }
        }
    }

    convertCardToString(card) {
        let reply = new Discord.MessageEmbed();
        reply.setTitle(card.name);
        if (BATTLE_DECK.includes(card) || LUNATIC_DECK.includes(card)) {
            if (BATTLE_DECK.includes(card)) reply.setColor('#7C8FD6');
            else reply.setColor('#BD7F36');
            reply.addField('point_value', card.point_value, false);
            if (card.timing_a) reply.addField('Timing', card.timing_a, true);
            if (card.cardTypes_a) reply.addField('Type', card.cardTypes_a.join(", "), true);
            reply.addField('Description', card.description_a, false);
            if (card.description_b) {
                if (card.timing_b) reply.addField('Timing', card.timing_b, true);
                if (card.cardTypes_b) reply.addField('Type', card.cardTypes_b.join(", "), true);
                reply.addField('Description', card.description_b, false);
            }
        } else if (CHARACTER_DECK.includes(card)) {
            reply.setColor('#C196CC');
            reply.addField('Ability', card.ability_description, false);
            reply.addField('Spell Card:', card.spell_card_name, false);
            if (card.spell_card_timing) reply.addField('Timing', card.spell_card_timing);
            reply.addField('Description:', card.spell_card_description, false);

        } else if (INCIDENT_DECK.includes(card)) {
            reply.setColor('#A13D3D');
            reply.addField('Description', card.description, false);
        } else if (ROLE_DECK.includes(card)) {
            reply.setColor('#959F94');
            reply.addField('Type', card.type, true);
            if(card.players) reply.addField('Number of players', card.players, true);
            else reply.addField('Number of players', "-", true);
            reply.addField('Description', card.description, false);

        }
        reply.setThumbnail(card.image);
        reply.setURL(card.link);
        reply.setFooter('See more: ' + card.link, "https://danmaku.party/favicon.png");
        return reply;
    }
}

module.exports = CardCommand;
