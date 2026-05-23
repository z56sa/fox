const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('عرض قائمة بجميع الأوامر المتاحة في البوت'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle('🦊 قائمة أوامر بوت FOX')
            .setDescription('إليك الأوامر المتاحة التي يمكنك استخدامها:')
            .addFields(
                { name: '🛠️ الإشراف والحماية', value: '`ban`, `kick`, `clear`, `lock`, `unlock`, `slowmode`', inline: false },
                { name: '🎮 ألعاب وتسلية', value: '`coinflip`, `slots`', inline: false },
                { name: '💰 إقتصاد', value: '`credits`, `daily`', inline: false },
                { name: '⚙️ إعدادات وعامة', value: '`ping`, `help`, `set-lang`, `send`, `welcome`, `tickets`', inline: false }
            );

        await interaction.reply({ embeds: [embed] });
    }
};