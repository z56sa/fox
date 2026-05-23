const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('تحديد وقت الوضع البطيء للشات')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('عدد الثواني (ضع 0 لإلغائه)')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');

        await interaction.channel.setRateLimitPerUser(seconds);
        if (seconds === 0) {
            await interaction.reply({ content: '✅ تم إيقاف الوضع البطيء في هذا القناة.' });
        } else {
            await interaction.reply({ content: `✅ تم تفعيل الوضع البطيء بمقدار **${seconds}** ثانية.` });
        }
    }
};