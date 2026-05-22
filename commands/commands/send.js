const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('send').setDescription('تحويل رصيد').addUserOption(o => o.setName('user').setRequired(true)).addIntegerOption(o => o.setName('amount').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        await interaction.reply(`💸 تم تحويل ${amount} لـ ${user.username}`);
    }
};