const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('رمي عملة نقدية (طرة أو نقش)'),

    async execute(interaction) {
        const outcomes = ['🪙 طرة (وجه)', '🪙 نقش (كتابة)'];
        const result = outcomes[Math.floor(Math.random() * outcomes.length)];
        await interaction.reply({ content: `لقد قمت برمي العملة والنتيجة هي: **${result}**` });
    }
};