const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('عرض رصيدك الحالي من الكريدت أو رصيد عضو آخر')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو المراد رؤية رصيده')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        // هنا يمكنك ربطها بقاعدة بياناتك لاحقاً، حالياً رصيد وهمي للفحص
        const coins = 500;
        await interaction.reply({ content: `💰 رصيد **${user.username}** الحالي هو: \`${coins}\` نقطة.` });
    }
};