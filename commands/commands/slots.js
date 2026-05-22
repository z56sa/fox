const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName('slots').setDescription('لعبة الحظ'),
    async execute(interaction) {
        const items = ['🍎', '🍋', '🍒', '💎'];
        const res = [items[Math.floor(Math.random() * items.length)], items[Math.floor(Math.random() * items.length)], items[Math.floor(Math.random() * items.length)]];
        await interaction.reply(`🎰 | ${res.join(' | ')} \n ${res[0] === res[1] && res[1] === res[2] ? '🎉 مبروك فزت!' : 'حظ أوفر'}`);
    }
};