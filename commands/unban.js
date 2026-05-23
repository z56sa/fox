const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('إلغاء حظر عضو باستخدام الـ ID')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('رقم الآيدي (ID) الخاص بالعضو')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('userid');

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply({ content: `✅ تم إلغاء الحظر عن المستخدم ذو الآيدي (${userId}) بنجاح!` });
        } catch (error) {
            await interaction.reply({ content: '❌ تعذر إلغاء الحظر. تأكد من أن الـ ID صحيح أو أن العضو ليس محظوراً بالأساس.', ephemeral: true });
        }
    }
};