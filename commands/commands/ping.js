const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping') // اسم الأمر
        .setDescription('يرد عليك بكلمة بونج!'), // وصف الأمر
    async execute(interaction) {
        await interaction.reply('🏓 بونج!');
    },
};