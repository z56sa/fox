const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('set-lang').setDescription('تغيير لغة البوت')
        .addStringOption(o => o.setName('lang').addChoices({ name: 'العربية', value: 'ar' }, { name: 'English', value: 'en' }))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        const lang = interaction.options.getString('lang');
        await interaction.reply(`🌐 **تم تغيير لغة البوت إلى: ${lang}**`);
    }
};