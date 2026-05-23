const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

if (!clientId || !token) {
    console.error('❌ تأكد من وجود CLIENT_ID و TOKEN داخل ملف .env');
    process.exit(1);
}

const commands = [];

// تصحيح المسار ليدخل المجلد الفرعي بدقة
const commandsPath = path.join(__dirname, 'commands', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(path.join(commandsPath, file));

        if (!command.data) {
            console.log(`⚠️ تم تجاهل ${file} لأنه لا يحتوي على data`);
            continue;
        }

        commands.push(command.data.toJSON());
        console.log(`✅ تم تحميل [ ${file} ] بنجاح`);
    } catch (err) {
        console.error(`❌ خطأ في فحص الملف ${file}:`, err.message);
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`\n🔄 جاري تسجيل (${commands.length}) أمر في ديسكورد...`);

        // رفع عام (Global) بدون الحاجة لـ Guild ID لتجنب خطأ الـ undefined الحالي
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );

        console.log('🎉 تم تسجيل جميع أوامر السلاش بنجاح وتعمل الآن في سيرفرك!');
    } catch (error) {
        console.error('❌ فشل التسجيل:', error);
    }
})();