const { Client, GatewayIntentBits } = require('discord.js');
const welcomeModule = require('./modules/welcome.js');
const ticketModule = require('./modules/tickets.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`🚀 FOX PRO SYSTEM IS ONLINE`);
});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.systemChannel;
    if (channel) channel.send(await welcomeModule.handleWelcome(member));
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.customId === 'open_ticket') {
        await interaction.deferReply({ ephemeral: true });
        const channel = await ticketModule.createTicket(interaction);
        interaction.editReply({ content: `✅ تم فتح تذكرتك: ${channel}` });
    }
});

client.login(process.env.token);