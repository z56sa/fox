const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('moderation').setDescription('عرض لوحة تحكم الموديريشن'),
    async execute(interaction) {
        const embed = new EmbedBuilder().setColor('Red').setTitle('🛡️ لوحة الموديريشن')
            .setDescription('استخدم الأوامر التالية لإدارة السيرفر:')
            .addFields({ name: 'حظر', value: '`/ban`', inline: true }, { name: 'طرد', value: '`/kick`', inline: true }, { name: 'قفل', value: '`/lock`', inline: true });
        await interaction.reply({ embeds: [embed] });
    }
};