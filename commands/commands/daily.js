const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('احصل على رصيدك اليومي'),
    async execute(interaction) {
        await interaction.reply('🎁 لقد حصلت على 500 كريديت لهذا اليوم!');
    },
};