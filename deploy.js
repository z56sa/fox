const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

// تأكد من وضع الـ ID الخاص بك هنا مباشرة إذا كان ملف .env لا يقرأه
const clientId = process.env.CLIENT_ID;
const token = process.env.token;

if (!clientId || !token) {
    console.error('❌ خطأ: تأكد من وجود TOKEN و CLIENT_ID في ملف .env');
    process.exit(1);
}

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🔄 جاري تسجيل الأوامر في ديسكورد...');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('✅ تم تسجيل جميع الأوامر بنجاح!');
    } catch (error) {
        console.error('❌ حدث خطأ أثناء التسجيل:', error);
    }
})();