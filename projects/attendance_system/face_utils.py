import cv2
import face_recognition
import numpy as np

def load_known_faces(cursor):
    """Loads students from database and registers their 128D face encodings."""
    cursor.execute("SELECT name, image_path FROM students")
    rows = cursor.fetchall()
    
    known_encodings = []
    known_names = []
    
    for name, img_path in rows:
        try:
            image = face_recognition.load_image_file(img_path)
            encoding = face_recognition.face_encodings(image)[0]
            known_encodings.append(encoding)
            known_names.append(name)
        except Exception as e:
            print(f"[WARNING] Could not load image for {name}: {e}")
            
    return known_encodings, known_names

def identify_face(rgb_small_frame, known_encodings, known_names):
    """Detects faces in current frame and matches with known database encodings."""
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
    
    face_names = []
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=0.5)
        name = "Unknown"
        
        # Or use distance for closest match
        face_distances = face_recognition.face_distance(known_encodings, face_encoding)
        if len(face_distances) > 0:
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_names[best_match_index]
                
        face_names.append(name)
        
    return face_locations, face_names
