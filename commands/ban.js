const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('حظر عضو من السيرفر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو المراد حظره')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('سبب الحظر')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'لم يتم ذكر سبب';
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) return interaction.reply({ content: '❌ هذا المستخدم ليس عضواً في السيرفر.', ephemeral: true });
        if (!member.bannable) return interaction.reply({ content: '❌ لا يمكنني حظر هذا العضو بسبب الرتبة.', ephemeral: true });

        await member.ban({ reason });
        await interaction.reply({ content: `✅ تم حظر **${user.tag}** بنجاح!\n📝 السبب: ${reason}` });
    }
};