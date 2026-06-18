const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = '!play';
const queue = new Map();

client.once('ready', () => {
    console.log(`[INFO] Music Bot connected as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.reply('⚠️ You must join a voice channel first!');
    }

    if (!searchString) {
        return message.reply('⚠️ Please provide a YouTube link or query! Example: `!play https://youtube.com/watch?v=...`');
    }

    try {
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        // Fetch YouTube stream
        const stream = ytdl(searchString, { filter: 'audioonly', highWaterMark: 1 << 25 });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Playing, () => {
            message.channel.send(`🎵 Now playing audio stream for requested link!`);
        });

        player.on('error', error => {
            console.error(`[ERROR] Audio player: ${error.message}`);
            message.channel.send('❌ Failed to play audio resource.');
        });

    } catch (err) {
        console.error(err);
        message.channel.send('❌ Could not join voice channel or play stream.');
    }
});

// Replace with actual token from Discord Developer Portal
client.login(process.env.DISCORD_MUSIC_TOKEN || 'YOUR_BOT_TOKEN_HERE');
