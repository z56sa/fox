const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-lang')
        .setDescription('تغيير لغة البوت داخل السيرفر')
        .addStringOption(option =>
            option.setName('language')
                .setDescription('اختر لغة البوت')
                .setRequired(true)
                .addChoices(
                    { name: 'العربية 🇸🇦', value: 'ar' },
                    { name: 'English 🇺🇸', value: 'en' }
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const lang = interaction.options.getString('language');
        const response = lang === 'ar' ? '✅ تم تغيير لغة البوت إلى العربية بنجاح.' : '✅ Language has been successfully changed to English.';
        await interaction.reply({ content: response });
    }
};