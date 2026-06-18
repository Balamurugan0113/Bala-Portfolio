# Real-Time ASL Hand Sign Translator

A deep learning gesture recognition pipeline that maps video camera frames to American Sign Language (ASL) phrases. Captures 21 landmarks on a hand in 3D coordinates using MediaPipe, tracks them over 30 sequential frames (~1 second), and inputs them to a trained LSTM model for predictions.

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Install Dependencies
This project requires OpenCV, MediaPipe, NumPy, and TensorFlow:
```bash
pip install opencv-python mediapipe numpy tensorflow
```

> 💡 **Tip:** If you do not have a GPU, TensorFlow will run on your CPU. The landmarks feature array (63 dimensions) is lightweight enough that CPU inference will easily maintain 24+ FPS.

### Step 2: Compile & Train the Model (Optional)
If you want to train your own custom LSTM model weights:
1. Review the model architecture:
   ```bash
   python model_train.py
   ```
2. Gather sequences of landmark coordinates of shape `(samples, 30, 63)` for each class in `classes.txt`.
3. Train the model using the model's compile configuration and save it as `asl_lstm_model.h5`.

### Step 3: Run the Inference Pipeline
Execute the real-time webcam detector:
```bash
python inference_pipeline.py
```

### Step 4: Validate Real-Time Execution
1. A window will open showing your live webcam feed.
2. If `asl_lstm_model.h5` is not found, the script will automatically fallback to **Landmark Tracer Mode** so you can test if MediaPipe detects your hand and draws the connection skeleton.
3. Bring your hand into the frame. You will see colored skeletal lines tracing your fingers.
4. If a trained model is present, hold a gesture (e.g. "HELLO" or "THANK YOU") for 1 second. The predicted gesture and the model's confidence rating will be overlayed on the top of the video screen.
5. Press `q` to quit the feed.
