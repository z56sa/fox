const {
    Client,
    GatewayIntentBits,
    Collection,
    Partials,
    REST,
    Routes,
    SlashCommandBuilder,
    ActivityType
} = require('discord.js');

const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration
    ],
    partials: [
        Partials.GuildMember,
        Partials.Message,
        Partials.Channel
    ]
});

client.commands = new Collection();

if (fs.existsSync('./commands')) {
    const commandFiles = fs.readdirSync('./commands')
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
        }
    }
}

client.once('ready', async () => {
    console.log(`✅ البوت جاهز! تم تسجيل الدخول باسم ${client.user.tag}`);

    client.user.setActivity('FOX Bot | /help', {
        type: ActivityType.Listening
    });

    try {
        const slashCommands = [
            new SlashCommandBuilder()
                .setName('ping')
                .setDescription('فحص البوت'),

            new SlashCommandBuilder()
                .setName('help')
                .setDescription('عرض قائمة الأوامر')
        ].map(cmd => cmd.toJSON());

        const rest = new REST({ version: '10' })
            .setToken(process.env.token);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: slashCommands }
        );

        console.log('✅ تم تسجيل أوامر السلاش بنجاح');
    } catch (err) {
        console.error('❌ خطأ في تسجيل أوامر السلاش:', err);
    }
});

// نظام الترحيب
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(
        c => c.name === 'welcome'
    );

    if (!channel) return;

    channel.send(
        `👋 أهلاً بك ${member} في سيرفر **${member.guild.name}**! نورتنا 🎉`
    );
});

// نظام اللوق
client.on('guildBanAdd', ban => {
    const logChannel = ban.guild.channels.cache.find(
        c => c.name === 'logs'
    );

    if (!logChannel) return;

    logChannel.send(
        `🔨 تم حظر العضو: ${ban.user.tag} (${ban.user.id})`
    );
});

client.on('messageDelete', message => {
    if (!message.guild) return;
    if (message.author?.bot) return;

    const logChannel = message.guild.channels.cache.find(
        c => c.name === 'logs'
    );

    if (!logChannel) return;

    logChannel.send(
        `🗑️ رسالة محذوفة في ${message.channel}\n${message.content || 'بدون محتوى'}`
    );
});

// أوامر السلاش
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        return interaction.reply(
            `🏓 Pong! ${client.ws.ping}ms`
        );
    }

    if (interaction.commandName === 'help') {
        return interaction.reply({
            content:
                `📜 قائمة الأوامر

/ping - فحص البوت
/help - المساعدة`,
            ephemeral: true
        });
    }

    const command = client.commands.get(
        interaction.commandName
    );

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: '❌ حدث خطأ أثناء تنفيذ الأمر',
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: '❌ حدث خطأ أثناء تنفيذ الأمر',
                ephemeral: true
            });
        }
    }
});

client.login(process.env.token);