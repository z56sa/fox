// modules/moderation.js
const db = require('../database.js');

module.exports = {
    addWarn: async (guildId, userId, reason) => {
        let warns = await db.get(`warns_${guildId}_${userId}`) || [];
        warns.push(reason);
        await db.set(`warns_${guildId}_${userId}`, warns);
    },
    getWarns: async (guildId, userId) => {
        return await db.get(`warns_${guildId}_${userId}`) || [];
    }
};