const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('مسح عدد من الرسائل')
        .addIntegerOption(option => option.setName('amount').setDescription('العدد').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply(`✅ تم مسح ${amount} رسالة.`);
    },
};