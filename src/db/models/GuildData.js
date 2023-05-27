'use strict';

const {DataTypes} = require('sequelize')
const {Model, ModelCtor} = require("../database");
const sequelize = require("../database");
/**
 *
 * @type {*|ModelCtor<Model>|void}
 */
module.exports = sequelize.define('guild_data',
    {
        id: {
            type: DataTypes.STRING("32"),
            primaryKey: true
        },
        welcome_channel: {
            type: DataTypes.STRING("32"),
        },
        welcome_message: {
            type: DataTypes.STRING("1900"),
            defaultValue: "**{USERNAME}** has joined the server.",
        },
        goodbye_channel: {
            type: DataTypes.STRING("32"),
        },
        goodbye_message: {
            type: DataTypes.STRING("1900"),
            defaultValue: "**{USERNAME}** has left the server.",
        },
        voice_log_channel: {
            type: DataTypes.STRING("32"),
        },
        new_members_roles: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        self_assignable_roles: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        default_roles: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        roles_categories: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        react_to_prefix: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        prefix: {
            type: DataTypes.STRING,
            defaultValue: "~"
        },
        allowed_command_groups: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        allow_nsfw_commands: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        dj_roles: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        playlists: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        language: {
            type: DataTypes.JSON,
            defaultValue: "[]"
        },
        open_skill: {
            type: DataTypes.JSON,
            defaultValue: "{}"
        },
        open_skill_role: {
            type: DataTypes.STRING("32")
        },
        character_ai_channel: {
            type: DataTypes.STRING("32"),
        },
    }, {
        timestamps: true
    }
);