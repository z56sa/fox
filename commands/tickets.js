const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tickets')
        .setDescription('إرسال لوحة فتح تذاكر الدعم الفني لممثلي الخدمة')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🎫 نظام تذاكر الدعم الفني')
            .setDescription('إذا كان لديك استفسار أو مشكلة، اضغط على الزر أدناه لفتح تذكرة خاصة والتحدث مع الإدارة.');

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('فتح تذكرة')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('📩')
        );

        await interaction.reply({ content: '✅ تم إرسال لوحة التذاكر بنجاح.', ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [button] });
    }
};