const commando = require('discord.js-commando');
const BATTLE_DECK = require('../danmaku/data/battle_cards.json');
const CHARACTER_DECK = require('../danmaku/data/character_cards.json');
const INCIDENT_DECK = require('../danmaku/data/incident_cards.json');
const LUNATIC_DECK = require('../danmaku/data/lunatic_cards.json');
const ROLE_DECK = require('../danmaku/data/role_cards.json');
const {stripIndents} = require('common-tags');
const Discord = require('discord.js');


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
        let respuesta = new Discord.MessageEmbed();
        respuesta.setTitle(card.name);
        if (BATTLE_DECK.includes(card) || LUNATIC_DECK.includes(card)) {
            if (BATTLE_DECK.includes(card)) respuesta.setColor('#7C8FD6');
            else respuesta.setColor('#BD7F36');
            respuesta.addField('point_value', card.point_value, false);
            if (card.timing_a) respuesta.addField('Timing', card.timing_a, true);
            if (card.cardTypes_a) respuesta.addField('Type', card.cardTypes_a.join(", "), true);
            respuesta.addField('Description', card.description_a, false);
            if (card.description_b) {
                if (card.timing_b) respuesta.addField('Timing', card.timing_b, true);
                if (card.cardTypes_b) respuesta.addField('Type', card.cardTypes_b.join(", "), true);
                respuesta.addField('Description', card.description_b, false);
            }
        } else if (CHARACTER_DECK.includes(card)) {
            respuesta.setColor('#C196CC');
            respuesta.addField('Ability', card.ability_description, false);
            respuesta.addField('Spell Card:', card.spell_card_name, false);
            if (card.spell_card_timing) respuesta.addField('Timing', card.spell_card_timing);
            respuesta.addField('Description:', card.spell_card_description, false);

        } else if (INCIDENT_DECK.includes(card)) {
            respuesta.setColor('#A13D3D');
            respuesta.addField('Description', card.description, false);
        } else if (ROLE_DECK.includes(card)) {
            respuesta.setColor('#959F94');
            respuesta.addField('Type', card.type, true);
            if(card.players) respuesta.addField('Number of players', card.players, true);
            else respuesta.addField('Number of players', "-", true);
            respuesta.addField('Description', card.description, false);

        }
        respuesta.setThumbnail(card.image);
        respuesta.setURL(card.link);
        respuesta.setFooter('See more: ' + card.link, "https://danmaku.party/favicon.png");
        return respuesta;
    }
}

module.exports = CardCommand;
