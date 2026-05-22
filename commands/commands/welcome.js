const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('welcome').setDescription('تحديد قناة الترحيب')
        .addChannelOption(o => o.setName('channel').setRequired(true).addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        await interaction.reply(`✅ **تم تعيين ${channel} كقناة للترحيب.**`);
    }
};