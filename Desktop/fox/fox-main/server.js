const express = require('express');
const app = express();
const welcomeModule = require('./modules/welcome.js');
const ticketModule = require('./modules/tickets.js');
app.use(express.urlencoded({ extended: true }));

function createModuleCard(title, route, fieldName, currentValue, guildId) {
    return `<div class="bg-gray-800 p-5 rounded-xl border border-gray-700">
        <h3 class="text-white font-bold mb-3">${title}</h3>
        <form action="${route}" method="POST">
            <input type="hidden" name="guildId" value="${guildId}">
            <input type="text" name="${fieldName}" value="${currentValue}" class="w-full bg-gray-900 text-white p-2 rounded mb-3">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded">حفظ</button>
        </form>
    </div>`;
}

app.get('/', async (req, res) => {
    let cards = '';
    cards += createModuleCard("رسالة الترحيب", "/update-welcome", "welcomeMsg", await welcomeModule.getWelcomeMessage("GUILD_ID"), "GUILD_ID");
    res.send(`<html><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 p-10"><div class="grid grid-cols-1 md:grid-cols-2 gap-6">${cards}</div></body></html>`);
});

app.post('/update-welcome', async (req, res) => {
    await welcomeModule.setWelcomeMessage(req.body.guildId, req.body.welcomeMsg);
    res.redirect('/');
});

// الدالة المطلوبة لتشغيل السيرفر من ملف index.js
function startDashboard(client) {
    app.listen(3000, () => {
        console.log('🌐 Dashboard is running on http://localhost:3000');
    });
}

// تصدير الدالة لتراها الملفات الأخرى
module.exports = { startDashboard };