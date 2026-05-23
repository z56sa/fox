const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('عرض معلومات إدارية سريعة ومختصرة حول السيرفر')
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),

    async execute(interaction) {
        const memberCount = interaction.guild.memberCount;
        await interaction.reply({ content: `🛡️ **لوحة التحكم السريعة:**\n• إجمالي الأعضاء: **${memberCount}**\n• مستوى الحماية بالسيرفر: **${interaction.guild.verificationLevel}**`, ephemeral: true });
    }
};