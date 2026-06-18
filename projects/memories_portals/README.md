# Surprise Birthday Wish & Memories Portals

A visually interactive canvas-based animation portal created for birthdays, anniversaries, and family memories. Utilizes HTML5 Canvas for real-time interactive physics animations and customizable media timelines.

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Open Locally in Browser
This is a lightweight static web resource:
1. Double-click `birthday.html` in your file explorer.
2. It will open in your default browser.
3. Click anywhere in the window. If you click on the floating balloons, the event listener will capture the click coordinate and trigger a popping action, deleting the balloon and respawning a new one in the background.

### Step 2: Customizing the Text and Greetings
To customize this page for a specific friend or family member:
1. Open `birthday.html` in a text editor (like VS Code or Notepad).
2. Find line 52:
   ```html
   <h1>🎉 Happy Birthday! 🎉</h1>
   ```
3. Change the name inside the headings tag to customize the wish! (e.g. `<h1>🎉 Happy Birthday Mom! 🎉</h1>`).
4. Find line 53 and customize the description paragraph with your personal message or timeline.
5. Save the file and reload the browser to view changes.

### Step 3: Adding Background Music
You can add a background audio playlist to play automatically when the page is loaded:
1. Place your MP3 file (e.g. `song.mp3`) inside this folder.
2. Add the `<audio>` tag inside the `<body>` of `birthday.html`:
   ```html
   <audio src="song.mp3" autoplay loop controls></audio>
   ```
3. Modern web browsers block audio from playing automatically without user interaction. The script handles this by waiting for the user's first click on the canvas (to pop a balloon) to trigger the audio playback context safely.
