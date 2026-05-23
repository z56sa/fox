const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('profile').setDescription('عرض بروفايلك'),
    async execute(interaction) {
        const embed = new EmbedBuilder().setColor('Purple').setTitle(`👤 ملف ${interaction.user.username}`)
            .addFields({ name: 'المستوى', value: '10', inline: true }, { name: 'السمعة (Rep)', value: '5', inline: true });
        await interaction.reply({ embeds: [embed] });
    }
};