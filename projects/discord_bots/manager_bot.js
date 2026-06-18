const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = '?';

client.once('ready', () => {
    console.log(`[INFO] Server Manager Bot connected as ${client.user.tag}`);
});

// Welcome Message Trigger
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('👋 Welcome to the Server!')
        .setDescription(`Hello ${member.user.username}, welcome to our community! Make sure to read the rules channel.`)
        .setTimestamp();

    channel.send({ embeds: [welcomeEmbed] });
});

// Moderation Commands
client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Kick Command
    if (command === 'kick') {
        if (!message.member.permissions.has('KickMembers')) {
            return message.reply("❌ You do not have permissions to kick members.");
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("⚠️ Please mention a user to kick.");

        try {
            await member.kick();
            message.channel.send(`✅ User ${member.user.tag} was successfully kicked.`);
        } catch (err) {
            message.reply("❌ Unable to kick user. Check role hierarchy.");
        }
    }

    // Server Info Command
    if (command === 'serverinfo') {
        const infoEmbed = new EmbedBuilder()
            .setColor('#2ECC71')
            .setTitle(message.guild.name)
            .addFields(
                { name: 'Total Members', value: `${message.guild.memberCount}`, inline: true },
                { name: 'Created At', value: message.guild.createdAt.toDateString(), inline: true }
            )
            .setTimestamp();
            
        message.channel.send({ embeds: [infoEmbed] });
    }
});

client.login(process.env.DISCORD_MANAGER_TOKEN || 'YOUR_BOT_TOKEN_HERE');
