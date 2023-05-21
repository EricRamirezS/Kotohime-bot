module.exports = {
    data: {
        name: 'ReactionRoles'
    },

    async execute(interaction, client) {
        try{
        const values = interaction.values;
        const fullValues = interaction.message.components[0].components[0].data.options;
        for (let opt of fullValues) {
            if (values.includes(opt.value) && !interaction.member.roles.cache.has(opt.value))
                interaction.member.roles.add(opt.value);
            else if (!values.includes(opt.value) && interaction.member.roles.cache.has(opt.value))
                interaction.member.roles.remove(opt.value);
        }
        } catch (e){
            console.log(e)
        }

        interaction.deferUpdate()
    }

};