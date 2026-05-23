const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('استلام المكافأة اليومية الخاصة بك'),

    async execute(interaction) {
        const reward = Math.floor(Math.random() * 200) + 50;
        await interaction.reply({ content: `🎁 لقد استلمت مكافأتك اليومية بنجاح وهي: \`${reward}\` نقطة!` });
    }
};