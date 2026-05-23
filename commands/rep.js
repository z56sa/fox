const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rep')
        .setDescription('إعطاء نقطة سمعة (+rep) لعضو آخر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو الذي تريد إعطاءه نقطة سمعة')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (user.id === interaction.user.id) {
            return interaction.reply({ content: '❌ لا يمكنك إعطاء نقطة سمعة لنفسك!', ephemeral: true });
        }

        if (user.bot) {
            return interaction.reply({ content: '❌ لا يمكنك إعطاء نقاط سمعة للبوتات.', ephemeral: true });
        }

        // هنا يمكنك ربطها بقاعدة البيانات لاحقاً
        await interaction.reply({ content: `✨ | قام **${interaction.user.username}** بإعطاء نقطة سمعة إلى **${user.username}**!` });
    }
};