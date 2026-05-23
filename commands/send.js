const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('إرسال رسالة إلى قناة معينة عن طريق البوت')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('القناة المراد الإرسال إليها')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
                .setDescription('النص الذي تريد من البوت كتابته')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const messageText = interaction.options.getString('message');

        if (!channel.isTextBased()) {
            return interaction.reply({ content: '❌ الرجاء اختيار قناة نصية فقط.', ephemeral: true });
        }

        await channel.send({ content: messageText });
        await interaction.reply({ content: `✅ تم إرسال الرسالة بنجاح إلى ${channel}`, ephemeral: true });
    }
};