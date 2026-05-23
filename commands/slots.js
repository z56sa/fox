const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('لعبة آلة الحظ (Slots)'),

    async execute(interaction) {
        const slots = ['🍎', '🍌', '🍒', '🍓', '💎'];
        const slot1 = slots[Math.floor(Math.random() * slots.length)];
        const slot2 = slots[Math.floor(Math.random() * slots.length)];
        const slot3 = slots[Math.floor(Math.random() * slots.length)];

        const resultText = (slot1 === slot2 && slot2 === slot3) ? '🎉 مبروك! لقد فزت!' : '❌ للأسف، حظاً أوفر المرة القادمة.';

        await interaction.reply({ content: `🎰 **[ ${slot1} | ${slot2} | ${slot3} ]** 🎰\n\n${resultText}` });
    }
};