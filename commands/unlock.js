const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('فتح القناة الحالية والسماح للأعضاء بالكتابة')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: null
        });
        await interaction.reply({ content: '🔓 تم فتح القناة بنجاح.' });
    }
};