const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('unban').setDescription('إلغاء حظر عضو').addStringOption(o => o.setName('id').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const id = interaction.options.getString('id');
        await interaction.guild.members.unban(id);
        await interaction.reply(`🔓 **تم فك الحظر عن العضو صاحب الـ ID: ${id}**`);
    }
};