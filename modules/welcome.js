const db = require('../database.js');
module.exports = {
    setWelcomeMessage: async (guildId, msg) => await db.set(`welcome_${guildId}`, msg),
    getWelcomeMessage: async (guildId) => await db.get(`welcome_${guildId}`) || "مرحباً بك يا غالي! 🦊",
    handleWelcome: async (member) => {
        const msg = await db.get(`welcome_${member.guild.id}`) || "مرحباً بك!";
        return msg.replace('{user}', `<@${member.id}>`);
    }
};