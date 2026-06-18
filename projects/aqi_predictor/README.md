# IoT Real-Time AQI Predictor & Alert System

An environmental forecasting pipeline that subscribes to live weather sensor telemetry over an MQTT broker, predicts short-term AQI values using a Random Forest regressor, and triggers automatic SMTP alerting protocols to control campus ventilation when hazards are forecasted.

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Install Dependencies
This project uses `paho-mqtt` for MQTT communication and `numpy` for prediction features:
```bash
pip install paho-mqtt numpy joblib scikit-learn
```

### Step 2: Run the AQI Forecasting Engine
The forecasting engine connects to the HiveMQ public broker and listens on the `campus/sensors/telemetry` topic:
```bash
python aqi_predictor.py
```
Upon launching, it will print:
```bash
[START] AQI forecasting subscriber active. Waiting for sensor telemetry...
```

### Step 3: Run the Sensor Simulator
In a separate terminal window, launch the telemetry node simulator to start publishing mock air sensor data (updating every few seconds):
```bash
python sensor_simulator.py
```
The simulator will print:
```bash
[SIMULATION] Streaming IoT telemetry packets every 3 seconds...
```

### Step 4: Verify Real-Time Telemetry and Alerts
1. Monitor the **AQI Forecasting Engine** terminal. You should see continuous output of sensor packets:
   ```bash
   [TELEMETRY] Sensor: BLOCK_A_LABS | Temp: 28.4°C | Current AQI: 84.2 | Predicted AQI (1h): 90.4
   ```
2. When the simulator randomly generates a high pollution spike (e.g. `PM2.5` > 110), the predicted AQI will cross the threshold value of `150.0`. The engine will output:
   ```bash
   [WARNING] Hazardous AQI predicted at BLOCK_B_CANTEEN (162.4). Dispatched facility override alert.
   [EMAIL] Alert message transmitted successfully for BLOCK_B_CANTEEN.
   ```
3. To customize the destination email address, edit the `receiver_email` variable inside `alert_client.py`.
