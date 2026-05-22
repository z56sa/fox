const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('credits').setDescription('عرض رصيدك'),
    async execute(interaction) {
        const embed = new EmbedBuilder().setColor('Gold').setTitle(`💰 رصيد ${interaction.user.username}`)
            .setDescription(`**رصيدك الحالي هو: 2,500 💵**`).setThumbnail(interaction.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    }
};