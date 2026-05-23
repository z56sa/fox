const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('قفل القناة الحالية ومنع الأعضاء من الكتابة')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: false
        });
        await interaction.reply({ content: '🔒 تم قفل هذه القناة بنجاح.' });
    }
};