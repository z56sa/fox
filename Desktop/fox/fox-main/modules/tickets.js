const db = require('../database.js');
const { ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    setTicketMsg: async (guildId, msg) => await db.set(`ticket_${guildId}`, msg),
    getTicketMessage: async (guildId) => await db.get(`ticket_${guildId}`) || "يرجى كتابة مشكلتك هنا.",
    createTicket: async (interaction) => {
        return await interaction.guild.channels.create({ name: `ticket-${interaction.user.username}`, type: ChannelType.GuildText });
    }
};