const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('قائمة المساعدة'),
    async execute(interaction) {
        const embed = new EmbedBuilder().setColor('Blue').setTitle('🦊 قائمة أوامر FOX Bot')
            .setDescription('**أوامر الموديريشن:** `/ban`, `/kick`, `/clear` \n **أوامر الاقتصاد:** `/credits`, `/send` \n **أوامر الترفيه:** `/slots`, `/coinflip`');
        await interaction.reply({ embeds: [embed] });
    }
};