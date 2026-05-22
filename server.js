const express = require('express');
const app = express();
const welcomeModule = require('./modules/welcome.js');
const ticketModule = require('./modules/tickets.js');
app.use(express.urlencoded({ extended: true }));

// 🆔 ضع أيدي سيرفر الديسكورد الخاص بك هنا بين علامتي التنصيص
const MY_GUILD_ID = "ضع_أيدي_سيرفرك_هنا";

function createModuleCard(title, route, fieldName, currentValue, guildId) {
    return `<div class="bg-gray-800 p-5 rounded-xl border border-gray-700">
        <h3 class="text-white font-bold mb-3">${title}</h3>
        <form action="${route}" method="POST">
            <input type="hidden" name="guildId" value="${guildId}">
            <input type="text" name="${fieldName}" value="${currentValue}" class="w-full bg-gray-900 text-white p-2 rounded mb-3" dir="rtl">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded">حفظ التعديل</button>
        </form>
    </div>`;
}

app.get('/', async (req, res) => {
    try {
        let cards = '';
        // جلب الرسالة باستخدام الأيدي الحقيقي للسيرفر لحل مشكلة التعليق والـ Failed
        const currentMsg = await welcomeModule.getWelcomeMessage(MY_GUILD_ID) || "مرحباً بك في السيرفر!";

        cards += createModuleCard("إعداد رسالة الترحيب", "/update-welcome", "welcomeMsg", currentMsg, MY_GUILD_ID);

        res.send(`<html><head><meta charset="UTF-8"><title>لوحة تحكم البوت</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 p-10" dir="rtl"><h1 class="text-white text-2xl font-bold mb-6 text-center">🎛️ لوحة تحكم بوت FOX</h1><div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">${cards}</div></body></html>`);
    } catch (error) {
        console.error(error);
        res.status(500).send("حدث خطأ داخلي أثناء تحميل اللوحة: " + error.message);
    }
});

app.post('/update-welcome', async (req, res) => {
    try {
        await welcomeModule.setWelcomeMessage(req.body.guildId, req.body.welcomeMsg);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("فشل في حفظ التعديل: " + error.message);
    }
});

// الدالة المطلوبة لتشغيل السيرفر من ملف index.js مع ربط بورت Render تلقائياً
function startDashboard(client) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🌐 Dashboard is running perfectly on port: ${port}`);
    });
}

// تصدير الدالة لتراها الملفات الأخرى
module.exports = { startDashboard };