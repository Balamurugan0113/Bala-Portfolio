# Discord Bot Suite

A dual-purpose Discord bot suite comprising a low-latency voice streaming bot (`music_bot.js`) and a server manager/moderation bot (`manager_bot.js`).

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Create a Discord Application
To host your own instances of these bots, you need application tokens:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and name your bot.
3. Navigate to the **Bot** tab on the left sidebar.
4. Click **Add Bot** and click **Reset Token** to copy your bot token securely.
5. In the **Privileged Gateway Intents** section, toggle on:
   * **Presence Intent**
   * **Server Members Intent**
   * **Message Content Intent** (Required for commands processing)

### Step 2: Install Node.js Dependencies
Ensure you have Node.js (v18+) installed. Initialize a project and install the library requirements:
```bash
npm init -y
npm install discord.js @discordjs/voice ytdl-core libsodium-wrappers ffmpeg-static
```

> 💡 **Audio Note:** The music streaming capabilities require `libsodium` and `ffmpeg` to capture and compress YouTube audio packets in real-time. The `ffmpeg-static` library handles this automatically on most systems.

### Step 3: Configure Bot Tokens
Edit the bot scripts (`music_bot.js` and `manager_bot.js`) to replace `'YOUR_BOT_TOKEN_HERE'` with the tokens generated in Step 1, or export them in your terminal environment:
```bash
# Windows PowerShell
$env:DISCORD_MUSIC_TOKEN="your_token_here"
$env:DISCORD_MANAGER_TOKEN="your_token_here"

# Linux / Bash
export DISCORD_MUSIC_TOKEN="your_token_here"
export DISCORD_MANAGER_TOKEN="your_token_here"
```

### Step 4: Run the Bots
Launch the bots:
* For the **Music Streamer Bot**:
  ```bash
  node music_bot.js
  ```
* For the **Server Manager Bot**:
  ```bash
  node manager_bot.js
  ```

### Step 5: Test Server Commands
Invite the bots to your Discord server using OAuth2 URL Generator in the developer portal with `bot` scopes:
* Type `!play <youtube_url>` in a text channel while connected to a voice channel to test the music player.
* Type `?serverinfo` to print server member stats, or `?kick @username` to test moderation tools.
