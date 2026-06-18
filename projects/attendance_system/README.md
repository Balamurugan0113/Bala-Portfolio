# Real-Time Face Recognition Attendance System

An edge computer vision system that monitors a webcam feed, matches faces against a registered local SQLite database using 128D facial descriptors, and automatically logs daily classroom attendance records.

## 📋 Data Requirements & Setup

To run this project in a real-time scenario, you need to provide facial data for the students you wish to register:

1. **Create the Photo Directory:**
   Create a folder named `faces/` in the same directory as the script.
   ```bash
   mkdir faces
   ```

2. **Add Student Photos:**
   Add a clear portrait photo (JPEG or PNG format) for each student you want to register.
   * Example: Place a photo of yourself and name it `balamurugan.jpg` inside the `faces/` folder.
   * Path: `faces/balamurugan.jpg`

---

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Install Dependencies
Ensure you have Python 3.8+ installed. Install the required computer vision and machine learning libraries:
```bash
pip install opencv-python numpy face-recognition
```

> 💡 **Windows Note:** The `face-recognition` library depends on `dlib`. You might need Visual Studio C++ build tools installed on your Windows machine to compile `dlib` successfully during installation.

### Step 2: Initialize the SQLite Database
Run the schema script to create the SQLite database and seed initial student records:
```bash
sqlite3 attendance.db < schema.sql
```
This sets up two tables:
* `students`: Holds student names, roll numbers, and path to their images.
* `logs`: Holds logged attendance records (name, date, time).

### Step 3: Run the Application
Execute the main application file:
```bash
python app.py
```

### Step 4: Validate Live Attendance
1. Stand in front of your camera.
2. The application will downsample the frames to `0.25x` (to optimize CPU performance for real-time inference), detect your face boundaries, and generate a 128D embedding.
3. It compares this embedding with the registered student encodings in the database.
4. If a match is found (with a distance threshold of `< 0.5`), it draws a green box with your name and prints:
   ```bash
   [SUCCESS] Checked IN: Balamurugan C at 09:15:32
   ```
5. Press `q` on your keyboard to close the live stream window.
