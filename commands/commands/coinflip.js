const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('coinflip').setDescription('رمي العملة'),
    async execute(interaction) {
        const result = Math.random() < 0.5 ? 'طِرة (Heads)' : 'نقش (Tails)';
        await interaction.reply(`🪙 نتيجتك هي: **${result}**`);
    }
};