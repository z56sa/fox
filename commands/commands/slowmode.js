const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('slowmode').setDescription('تحديد السرعة').addIntegerOption(o => o.setName('seconds').setRequired(true)),
    async execute(interaction) {
        await interaction.channel.setRateLimitPerUser(interaction.options.getInteger('seconds'));
        await interaction.reply(`⏱️ تم ضبط السلومود على ${interaction.options.getInteger('seconds')} ثانية`);
    }
};