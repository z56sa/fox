const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration // ضروري للـ Ban/Logs
    ],
    partials: [Partials.GuildMember, Partials.Message, Partials.Channel]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`✅ البوت جاهز! تم تسجيل الدخول باسم ${client.user.tag}`);
    client.user.setActivity('FOX Bot | /help', { type: 'LISTENING' });
});

// --- نظام الترحيب التلقائي ---
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(c => c.name === "welcome");
    if (!channel) return;
    channel.send(`👋 أهلاً بك ${member} في سيرفر **${member.guild.name}**! نورتنا 🎉`);
});

// --- نظام اللوق (Logs System) ---
client.on('guildBanAdd', (ban) => {
    const logChannel = ban.guild.channels.cache.find(c => c.name === "logs");
    if (!logChannel) return;
    logChannel.send(`🔨 **تم حظر العضو:** ${ban.user.tag} (ID: ${ban.user.id})`);
});

client.on('messageDelete', (message) => {
    if (message.author?.bot) return;
    const logChannel = message.guild.channels.cache.find(c => c.name === "logs");
    if (!logChannel) return;
    logChannel.send(`🗑️ **رسالة محذوفة في ${message.channel}:** "${message.content}" بواسطة ${message.author?.tag || 'غير معروف'}`);
});

// --- معالجة الأوامر ---
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ حدث خطأ أثناء تنفيذ هذا الأمر!', ephemeral: true });
    }
});

client.login(process.env.token);