const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('rep').setDescription('إعطاء سمعة لعضو')
        .addUserOption(o => o.setName('user').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.reply(`⭐ **تم إعطاء نقطة سمعة لـ ${user.username} بنجاح!**`);
    }
};