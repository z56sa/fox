const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('مسح كمية محددة من الرسائل من الشات')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('عدد الرسائل المراد مسحها (بين 1 إلى 100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        const messages = await interaction.channel.bulkDelete(amount, true).catch(err => console.log(err));

        if (!messages) {
            return interaction.reply({ content: '❌ فشل مسح الرسائل (قد تكون الرسائل قديمة جداً وتخطت 14 يوماً).', ephemeral: true });
        }

        await interaction.reply({ content: `🧹 تم مسح **${messages.size}** رسالة بنجاح.`, ephemeral: true });
    }
};