import discord
from discord.ext import commands
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import sqlite3
import os

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

# SQLite local cache
conn = sqlite3.connect("kanchipuram_economy.db")
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS transactions 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, action TEXT, item TEXT, qty INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
conn.commit()

# Google Sheets Auth
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)
sheet = client.open("Kanchipuram_FiveM_Ledger").sheet1

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name} - FiveM Economy Daemon Active")

@bot.command()
@commands.has_any_role("Manager", "Lead Crafter", "Member")
async def log_activity(ctx, action: str, item: str, quantity: int):
    # Persist locally
    cursor.execute("INSERT INTO transactions (user_id, action, item, qty) VALUES (?, ?, ?, ?)",
                   (str(ctx.author.id), action, item, quantity))
    conn.commit()
    
    # Push to Google Sheet
    sheet.append_row([str(ctx.author), action, item, quantity, str(ctx.message.created_at)])
    
    embed = discord.Embed(title="Transaction Logged", color=0x00FF88)
    embed.add_field(name="User", value=ctx.author.mention, inline=True)
    embed.add_field(name="Action", value=action.upper(), inline=True)
    embed.add_field(name="Item & Qty", value=f"{quantity}x {item}", inline=False)
    await ctx.send(embed=embed)