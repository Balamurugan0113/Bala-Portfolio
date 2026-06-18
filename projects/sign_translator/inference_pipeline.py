#!/usr/bin/env python3
"""
Real-Time ASL Hand Sign Translator
Deep learning gesture recognition using MediaPipe + LSTM
Translates American Sign Language to text in real-time
"""

import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
import os
from datetime import datetime

class ASLTranslator:
    \"\"\"Real-time ASL gesture to text translator\"\"\"
    
    def __init__(self, model_path=\"asl_lstm_model.h5\"):
        self.gesture_classes = [
            'HELLO', 'THANK_YOU', 'YES', 'NO', 'HELP',
            'STUDENT', 'CLASSROOM', 'WATER', 'FRIEND', 'LOVE'
        ]
        
        self.model = self._load_model(model_path)
        self.confidence_threshold = 0.80
        self.sequence_length = 30
        self.sequence = []
        self.fps = 0
        self.prev_time = datetime.now()
        
        # Initialize MediaPipe
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5
        )
        self.mp_draw = mp.solutions.drawing_utils
    
    def _load_model(self, model_path):
        \"\"\"Load LSTM model or fallback to landmark tracer\"\"\"
        if os.path.exists(model_path):
            try:
                model = tf.keras.models.load_model(model_path)
                print(f\"[INFO] LSTM model loaded: {model_path}\")
                return model
            except Exception as e:
                print(f\"[WARNING] Could not load model: {e}\")
        
        print(\"[INFO] Running in landmark tracer mode (no model)\")
        return None
    
    def extract_hand_landmarks(self, hand_landmarks) -> np.ndarray:
        \"\"\"Extract and normalize hand landmark coordinates\"\"\"
        landmarks = np.zeros(21 * 3)  # 21 points * 3 dimensions (x, y, z)
        
        try:
            for idx, landmark in enumerate(hand_landmarks.landmark):
                landmarks[idx * 3] = landmark.x
                landmarks[idx * 3 + 1] = landmark.y
                landmarks[idx * 3 + 2] = landmark.z
        except Exception as e:
            print(f\"[ERROR] Landmark extraction failed: {e}\")
        
        return landmarks
    
    def normalize_landmarks(self, landmarks) -> np.ndarray:
        \"\"\"Normalize landmarks to improve model robustness\"\"\"
        # Get bounding box
        x_coords = landmarks[0::3]
        y_coords = landmarks[1::3]
        
        if len(x_coords) > 0 and len(y_coords) > 0:
            x_min, x_max = np.min(x_coords), np.max(x_coords)
            y_min, y_max = np.min(y_coords), np.max(y_coords)
            
            # Normalize to [0, 1]
            for i in range(0, len(landmarks), 3):
                if x_max - x_min > 0:
                    landmarks[i] = (landmarks[i] - x_min) / (x_max - x_min)
                if y_max - y_min > 0:
                    landmarks[i + 1] = (landmarks[i + 1] - y_min) / (y_max - y_min)
        
        return landmarks
    
    def predict_gesture(self, sequence) -> tuple:
        \"\"\"Predict gesture from temporal sequence of landmarks\"\"\"
        if self.model is None or len(sequence) < self.sequence_length:
            return None, 0
        
        try:
            # Prepare input for LSTM
            input_data = np.array(sequence[-self.sequence_length:])
            input_data = np.expand_dims(input_data, axis=0)
            
            # Get predictions
            predictions = self.model.predict(input_data, verbose=0)[0]
            gesture_idx = np.argmax(predictions)
            confidence = predictions[gesture_idx]
            
            if confidence > self.confidence_threshold:
                return self.gesture_classes[gesture_idx], confidence
            
        except Exception as e:
            print(f\"[ERROR] Prediction failed: {e}\")
        
        return None, 0
    
    def process_frame(self, frame) -> tuple:
        \"\"\"Process video frame for hand detection and recognition\"\"\"
        h, w, c = frame.shape
        
        # Flip for selfie view
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Detect hands
        results = self.hands.process(rgb_frame)
        
        recognized_gesture = None
        confidence = 0
        
        if results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            
            # Draw landmarks
            self.mp_draw.draw_landmarks(frame, hand_landmarks, self.mp_hands.HAND_CONNECTIONS)
            
            # Extract and normalize landmarks
            landmarks = self.extract_hand_landmarks(hand_landmarks)
            landmarks = self.normalize_landmarks(landmarks)
            
            # Add to sequence buffer
            self.sequence.append(landmarks)
            self.sequence = self.sequence[-self.sequence_length:]
            
            # Predict gesture if sequence is full
            if len(self.sequence) == self.sequence_length:
                gesture, conf = self.predict_gesture(self.sequence)
                if gesture:
                    recognized_gesture = gesture
                    confidence = conf
        
        return frame, recognized_gesture, confidence
    
    def update_fps(self):
        \"\"\"Calculate FPS\"\"\"
        current_time = datetime.now()
        elapsed = (current_time - self.prev_time).total_seconds()
        if elapsed > 0:
            self.fps = 1 / elapsed
        self.prev_time = current_time
    
    def draw_ui(self, frame, gesture, confidence):
        \"\"\"Draw UI elements on frame\"\"\"
        h, w, c = frame.shape
        
        # Draw FPS
        self.update_fps()
        cv2.putText(frame, f\"FPS: {self.fps:.1f}\", (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Draw gesture prediction
        if gesture:
            color = (0, 255, 0)  # Green for recognized
            label = f\"{gesture} ({confidence:.2%})\"
        else:
            color = (0, 165, 255)  # Orange for detecting
            label = \"Detecting gesture...\"
        
        # Prediction box
        cv2.rectangle(frame, (0, 0), (w, 50), (30, 30, 30), -1)
        cv2.rectangle(frame, (0, 0), (w, 50), color, 2)
        cv2.putText(frame, label, (20, 35),
                   cv2.FONT_HERSHEY_DUPLEX, 1.2, color, 2)
        
        # Mode indicator
        mode = \"LSTM Mode\" if self.model else \"Landmark Tracer\"
        cv2.putText(frame, f\"[{mode}]\", (w - 200, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (100, 100, 255), 1)
        
        # Instructions
        cv2.putText(frame, \"Press 'q' to quit | Press 's' to save screenshot\",
                   (10, h - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)
        
        return frame
    
    def run(self):
        \"\"\"Start real-time ASL translation\"\"\"
        print(\"\\n\" + \"=\"*60)
        print(\"🤟 Real-Time ASL Hand Sign Translator v1.0\")
        print(\"=\"*60)
        print(f\"[INFO] Classes supported: {', '.join(self.gesture_classes[:5])}...\")
        print(f\"[INFO] Sequence length: {self.sequence_length} frames\")
        print(f\"[INFO] Confidence threshold: {self.confidence_threshold}\")
        print(\"[INFO] Starting camera... Press 'q' to exit\\n\")
        
        cap = cv2.VideoCapture(0)
        frame_count = 0
        
        try:
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break
                
                frame_count += 1
                
                # Process frame
                frame, gesture, confidence = self.process_frame(frame)
                frame = self.draw_ui(frame, gesture, confidence)
                
                # Display
                cv2.imshow('ASL Translator | Press Q to Exit', frame)
                
                # Handle key input
                key = cv2.waitKey(1) & 0xFF
                if key == ord('q'):
                    break
                elif key == ord('s'):
                    filename = f\"asl_capture_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg\"
                    cv2.imwrite(filename, frame)
                    print(f\"[SAVE] Screenshot saved: {filename}\")
        
        finally:
            cap.release()
            cv2.destroyAllWindows()
            print(f\"\\n[STOP] Processed {frame_count} frames. Session ended.\")

if __name__ == \"__main__\":
    translator = ASLTranslator()
    translator.run()
