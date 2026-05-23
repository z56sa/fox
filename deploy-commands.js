const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];

// تحديد المسار الصحيح لمجلد الأوامر
const commandsPath = path.join(__dirname, 'commands', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(`فحص الملف: ${file}`);
    try {
        const command = require(path.join(commandsPath, file));

        if (!command.data) {
            console.log(`❌ لا يوجد data في ${file}`);
            continue;
        }

        commands.push(command.data.toJSON());
        console.log(`✅ تم تحميل ${file} بنجاح!`);
    } catch (error) {
        console.log(`❌ خطأ في ملف: [ ${file} ] ->`, error.message);
    }
}

// إعداد دالة الـ REST لإرسال الأوامر إلى ديسكورد
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`\n🔄 جاري رفع (${commands.length}) أمر إلى ديسكورد...`);

        // رفع الأوامر بشكل عام (Global) لتظهر في سيرفرك فوراً
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log(`\n🎉 بنجاح! تم تسجيل (${data.length}) أمر في ديسكورد وتعمل الآن.`);
    } catch (error) {
        console.error('❌ حدث خطأ أثناء التسجيل في ديسكورد:', error);
    }
})();