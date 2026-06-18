import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

def build_model(input_shape, num_classes):
    """LSTM Network architecture optimized for temporal hand gesture sequence processing."""
    model = Sequential([
        LSTM(64, return_sequences=True, activation='relu', input_shape=input_shape),
        Dropout(0.2),
        LSTM(128, return_sequences=False, activation='relu'),
        Dropout(0.2),
        Dense(64, activation='relu'),
        Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='Adam', 
        loss='categorical_crossentropy', 
        metrics=['categorical_accuracy']
    )
    return model

if __name__ == "__main__":
    # Input shape: 30 frames of sequence, each containing 21 landmarks * 3 coords = 63 features
    input_shape = (30, 63)
    classes_count = 7
    
    lstm_model = build_model(input_shape, classes_count)
    lstm_model.summary()
    
    print("\n[INFO] Model architecture compiled. To train:")
    print("1. Gather landmark coordinate arrays of shapes (X, 30, 63)")
    print("2. Run lstm_model.fit(X_train, y_train, epochs=200)")
    print("3. Export using: lstm_model.save('asl_lstm_model.h5')")
