const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('عرض رصيدك الحالي في البنك'),

    async execute(interaction) {
        // يمكنك هنا لاحقاً جلب الرصيد من قاعدة بيانات (JSON أو MongoDB)
        const myCredits = 2000;

        const embed = new EmbedBuilder()
            .setColor('#FFD700') // لون ذهبي
            .setTitle(`💰 | رصيد ${interaction.user.username}`)
            .setDescription(`أهلاً بك يا **${interaction.user.username}**!`)
            .addFields(
                { name: 'الرصيد الحالي:', value: `**${myCredits.toLocaleString()}** 💵`, inline: true },
                { name: 'الحالة:', value: '✅ نشط', inline: true }
            )
            .setThumbnail(interaction.user.displayAvatarURL())
            .setFooter({ text: 'FOX Bot - نظام الاقتصاد', iconURL: interaction.client.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};