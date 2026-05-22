const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('ban').setDescription('حظر عضو').addUserOption(o => o.setName('user').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.guild.members.ban(user);
        await interaction.reply(`🔨 **تم حظر ${user.tag} بنجاح.**`);
    }
};