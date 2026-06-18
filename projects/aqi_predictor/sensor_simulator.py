import time
import random
import json
import paho.mqtt.client as mqtt

client = mqtt.Client("Simulated_Sensor_Node")
client.connect("broker.hivemq.com", 1883)

sensors = ["BLOCK_A_LABS", "BLOCK_B_CANTEEN", "BLOCK_C_HOSTEL"]

print("[SIMULATION] Streaming IoT telemetry packets every 3 seconds...")
try:
    while True:
        for sensor in sensors:
            # Generate mock fluctuations (simulate bad AQI during peak hours)
            pm25 = random.uniform(20.0, 120.0)
            pm10 = random.uniform(30.0, 160.0)
            co2 = random.uniform(400.0, 1200.0)
            temp = random.uniform(25.0, 32.0)
            humidity = random.uniform(45.0, 75.0)

            # Force high-pollution parameters periodically to test triggers
            if random.random() < 0.15:
                pm25 = random.uniform(110.0, 150.0)
                pm10 = random.uniform(140.0, 200.0)

            data = {
                "sensor_id": sensor,
                "pm25": round(pm25, 2),
                "pm10": round(pm10, 2),
                "co2": round(co2, 2),
                "temp": round(temp, 1),
                "humidity": round(humidity, 1),
                "timestamp": time.time()
            }

            client.publish("campus/sensors/telemetry", json.dumps(data))
            time.sleep(1)
        time.sleep(2)
except KeyboardInterrupt:
    print("[STOP] Sensor simulation completed.")
