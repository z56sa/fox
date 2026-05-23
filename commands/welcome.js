const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('إعداد وتفعيل نظام الترحيب بالأعضاء الجدد')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('روم الترحيب المطلوبة')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        await interaction.reply({ content: `⚙️ تم تحديد الروم ${channel} لتكون غرفة الترحيب بالأعضاء الجدد بنجاح!` });
    }
};