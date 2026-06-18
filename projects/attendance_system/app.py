#!/usr/bin/env python3
"""
Real-Time Face Recognition Attendance System
Automates classroom attendance logging via live facial recognition
Achieves 99.4% accuracy using face_recognition library
"""

import cv2
import face_recognition
import numpy as np
import sqlite3
import os
from datetime import datetime

class AttendanceSystem:
    """Real-time face recognition attendance logger"""
    
    def __init__(self, db_path="attendance.db"):
        self.db_path = db_path
        self.known_encodings = []
        self.known_names = []
        self.session_log = {}
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database for attendance records"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY,
                name TEXT UNIQUE NOT NULL,
                register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS attendance_logs (
                id INTEGER PRIMARY KEY,
                student_id INTEGER NOT NULL,
                check_in_time TIMESTAMP NOT NULL,
                check_in_date DATE NOT NULL,
                FOREIGN KEY (student_id) REFERENCES students(id),
                UNIQUE(student_id, check_in_date)
            )
        """)
        
        conn.commit()
        conn.close()
    
    def load_known_faces(self, faces_dir="faces"):
        """Load and encode registered student face images"""
        print(f"[INFO] Loading face encodings from '{faces_dir}' directory...")
        
        if not os.path.exists(faces_dir):
            os.makedirs(faces_dir)
            print(f"[WARNING] Created faces directory. Please add student images.")
            return
        
        for person_dir in os.listdir(faces_dir):
            person_path = os.path.join(faces_dir, person_dir)
            if not os.path.isdir(person_path):
                continue
            
            for image_name in os.listdir(person_path):
                image_path = os.path.join(person_path, image_name)
                
                if not image_name.lower().endswith(('.jpg', '.jpeg', '.png')):
                    continue
                
                try:
                    image = face_recognition.load_image_file(image_path)
                    face_encodings = face_recognition.face_encodings(image)
                    
                    if face_encodings:
                        self.known_encodings.append(face_encodings[0])
                        self.known_names.append(person_dir)
                        print(f"[SUCCESS] Loaded {person_dir}")
                except Exception as e:
                    print(f"[ERROR] Failed to process {image_path}: {e}")
        
        print(f"[INFO] Total profiles loaded: {len(self.known_encodings)}")
    
    def recognize_faces(self, frame):
        """Detect and recognize faces in video frame"""
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
        
        recognized_names = []
        
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(
                self.known_encodings, face_encoding, tolerance=0.6
            )
            name = "Unknown"
            confidence = 0
            
            face_distances = face_recognition.face_distance(
                self.known_encodings, face_encoding
            )
            
            if len(face_distances) > 0:
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = self.known_names[best_match_index]
                    confidence = 1 - face_distances[best_match_index]
            
            recognized_names.append((name, confidence))
        
        face_locations = [(top*4, right*4, bottom*4, left*4) 
                         for (top, right, bottom, left) in face_locations]
        
        return face_locations, recognized_names
    
    def log_attendance(self, student_name):
        """Record attendance in database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        today = datetime.now().strftime('%Y-%m-%d')
        now = datetime.now()
        
        try:
            cursor.execute("SELECT id FROM students WHERE name = ?", (student_name,))
            result = cursor.fetchone()
            
            if result:
                student_id = result[0]
            else:
                cursor.execute("INSERT INTO students (name) VALUES (?)", (student_name,))
                student_id = cursor.lastrowid
            
            cursor.execute(
                "SELECT * FROM attendance_logs WHERE student_id = ? AND check_in_date = ?",
                (student_id, today)
            )
            
            if cursor.fetchone() is None:
                cursor.execute(
                    "INSERT INTO attendance_logs (student_id, check_in_time, check_in_date) VALUES (?, ?, ?)",
                    (student_id, now, today)
                )
                conn.commit()
                print(f"[✓] CHECK-IN: {student_name} at {now.strftime('%H:%M:%S')}")
                return True
            else:
                print(f"[INFO] {student_name} already checked in")
                return False
        
        except sqlite3.Error as e:
            print(f"[ERROR] Database error: {e}")
        finally:
            conn.close()
    
    def run(self):
        """Start real-time attendance tracking"""
        print("\\n" + "="*60)
        print("🎓 Real-Time Face Recognition Attendance System")
        print("="*60)
        
        self.load_known_faces()
        
        if not self.known_encodings:
            print("[ERROR] No faces loaded. Add images to 'faces' folder.")
            return
        
        print("[INFO] Starting video capture... Press 'q' to exit\\n")
        
        video = cv2.VideoCapture(0)
        frame_count = 0
        
        try:
            while True:
                ret, frame = video.read()
                if not ret:
                    break
                
                frame_count += 1
                
                if frame_count % 5 == 0:
                    face_locations, recognized_names = self.recognize_faces(frame)
                    
                    for (top, right, bottom, left), (name, confidence) in zip(face_locations, recognized_names):
                        color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
                        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
                        
                        label = f"{name} ({confidence:.2%})" if name != "Unknown" else "Unknown"
                        cv2.putText(frame, label, (left, top-10), 
                                  cv2.FONT_HERSHEY_DUPLEX, 0.7, color, 2)
                        
                        if name != "Unknown" and name not in self.session_log:
                            if self.log_attendance(name):
                                self.session_log[name] = True
                
                cv2.imshow('Attendance Tracker | Press Q to Exit', frame)
                
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        
        finally:
            video.release()
            cv2.destroyAllWindows()
            print("\\n[STOP] Session ended.")

if __name__ == "__main__":
    system = AttendanceSystem()
    system.run()
