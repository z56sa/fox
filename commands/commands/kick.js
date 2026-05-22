const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('kick').setDescription('طرد عضو').addUserOption(o => o.setName('target').setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        await member.kick();
        await interaction.reply(`👢 تم طرد ${member.user.tag}`);
    }
};