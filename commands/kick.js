const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('طرد عضو من السيرفر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو المراد طرده')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('سبب الطرد')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'لم يتم ذكر سبب';
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) return interaction.reply({ content: '❌ هذا المستخدم ليس عضواً في السيرفر.', ephemeral: true });
        if (!member.kickable) return interaction.reply({ content: '❌ لا يمكنني طرد هذا العضو.', ephemeral: true });

        await member.kick(reason);
        await interaction.reply({ content: `✅ تم طرد **${user.tag}** بنجاح!\n📝 السبب: ${reason}` });
    }
};