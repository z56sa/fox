const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('عرض سرعة اتصال البوت واستجابته'),

    async execute(interaction) {
        const sent = await interaction.reply({ content: 'جاري الحساب...', fetchReply: true, ephemeral: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply({ content: `🏓 بنج البوت: **${latency}ms**\n🌐 بنج ديسكورد: **${interaction.client.ws.ping}ms**` });
    }
};