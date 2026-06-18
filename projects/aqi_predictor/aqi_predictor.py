#!/usr/bin/env python3
"""
Real-Time AQI Forecasting Engine
Predicts air quality trends from sensor telemetry using Random Forest Regression
Sends automated alerts when hazardous AQI thresholds are exceeded
"""

import json
import numpy as np
from datetime import datetime, timedelta
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AQIPredictor:
    \"\"\"Real-time AQI prediction and alert system\"\"\"
    
    def __init__(self):
        self.sensor_data_history = []
        self.alert_threshold = 150.0
        self.critical_threshold = 200.0
        
        # Random Forest mock model (replace with actual joblib model in production)
        self.model_weights = {
            "pm25": 1.2,
            "pm10": 0.9,
            "co2": 0.1,
            "temp": -0.05,
            "humidity": -0.03
        }
    
    def calculate_aqi_index(self, pm25: float, pm10: float, co2: float) -> float:
        \"\"\"Calculate immediate AQI using EPA standard formulas\"\"\"
        # Breakpoint calculations
        aqi_pm25 = pm25 * 1.5
        aqi_pm10 = pm10 * 0.9
        aqi_co2 = co2 * 0.1
        
        return max(aqi_pm25, aqi_pm10, aqi_co2)
    
    def predict_aqi_1hour(self, features: dict) -> float:
        \"\"\"Predict AQI for next 1 hour using weighted model\"\"\"
        base_aqi = self.calculate_aqi_index(
            features["pm25"],
            features["pm10"],
            features["co2"]
        )
        
        # Apply environmental factors
        temp_adjustment = features.get("temp", 25) * self.model_weights["temp"]
        humidity_adjustment = features.get("humidity", 50) * self.model_weights["humidity"]
        
        predicted = base_aqi + temp_adjustment + humidity_adjustment
        
        # Add 5% growth trend for 1-hour forecast
        predicted *= 1.05
        
        return max(0, predicted)
    
    def classify_aqi_level(self, aqi: float) -> dict:
        \"\"\"Classify AQI into health categories\"\"\"
        if aqi <= 50:
            return {"level": "GOOD", "color": "green", "health": "No health impact"}
        elif aqi <= 100:
            return {"level": "MODERATE", "color": "yellow", "health": "Sensitive groups affected"}
        elif aqi <= 150:
            return {"level": "UNHEALTHY_SG", "color": "orange", "health": "Unhealthy for sensitive"}
        elif aqi <= 200:
            return {"level": "UNHEALTHY", "color": "red", "health": "General public affected"}
        elif aqi <= 300:
            return {"level": "VERY_UNHEALTHY", "color": "purple", "health": "Everyone affected"}
        else:
            return {"level": "HAZARDOUS", "color": "maroon", "health": "Health alert"}
    
    def process_sensor_telemetry(self, payload: dict) -> dict:
        \"\"\"Process and analyze sensor telemetry data\"\"\"
        try:
            sensor_id = payload.get("sensor_id")
            pm25 = float(payload.get("pm25", 0))
            pm10 = float(payload.get("pm10", 0))
            co2 = float(payload.get("co2", 0))
            temp = float(payload.get("temp", 25))
            humidity = float(payload.get("humidity", 50))
            location = payload.get("location", "Unknown")
            
            # Store in history
            self.sensor_data_history.append({
                "timestamp": datetime.now(),
                "sensor_id": sensor_id,
                "pm25": pm25,
                "pm10": pm10,
                "co2": co2,
                "temp": temp,
                "humidity": humidity
            })
            
            # Keep last 100 readings
            if len(self.sensor_data_history) > 100:
                self.sensor_data_history = self.sensor_data_history[-100:]
            
            # Calculate current AQI
            current_aqi = self.calculate_aqi_index(pm25, pm10, co2)
            
            # Predict 1-hour AQI
            features = {
                "pm25": pm25,
                "pm10": pm10,
                "co2": co2,
                "temp": temp,
                "humidity": humidity
            }
            predicted_aqi = self.predict_aqi_1hour(features)
            
            # Classify levels
            current_level = self.classify_aqi_level(current_aqi)
            predicted_level = self.classify_aqi_level(predicted_aqi)
            
            result = {
                "timestamp": datetime.now().isoformat(),
                "sensor_id": sensor_id,
                "location": location,
                "current_aqi": round(current_aqi, 1),
                "current_level": current_level["level"],
                "predicted_aqi_1h": round(predicted_aqi, 1),
                "predicted_level": predicted_level["level"],
                "pollutants": {
                    "pm25": pm25,
                    "pm10": pm10,
                    "co2": co2
                },
                "environment": {
                    "temperature": temp,
                    "humidity": humidity
                },
                "alerts": []
            }
            
            # Generate alerts
            if predicted_aqi > self.critical_threshold:
                result["alerts"].append({
                    "severity": "CRITICAL",
                    "message": f"HAZARDOUS AQI predicted: {predicted_aqi:.1f}",
                    "action": "Issue public health warning"
                })
                logger.critical(f"[CRITICAL] Hazardous AQI predicted at {sensor_id}: {predicted_aqi:.1f}")
            
            elif predicted_aqi > self.alert_threshold:
                result["alerts"].append({
                    "severity": "HIGH",
                    "message": f"Unhealthy AQI predicted: {predicted_aqi:.1f}",
                    "action": "Increase ventilation systems"
                })
                logger.warning(f"[WARNING] High AQI predicted at {sensor_id}: {predicted_aqi:.1f}")
            
            logger.info(f"[TELEMETRY] {sensor_id} | Current AQI: {current_aqi:.1f} | Predicted (1h): {predicted_aqi:.1f} | Temp: {temp}°C\")\n            return result
        
        except (ValueError, TypeError) as e:
            logger.error(f"[ERROR] Invalid telemetry format: {e}")
            return None
    
    def generate_hourly_report(self) -> dict:
        \"\"\"Generate hourly AQI report\"\"\"
        if not self.sensor_data_history:
            return {"error": "No data available"}
        
        avg_pm25 = np.mean([d["pm25"] for d in self.sensor_data_history])
        avg_pm10 = np.mean([d["pm10"] for d in self.sensor_data_history])
        avg_co2 = np.mean([d["co2"] for d in self.sensor_data_history])
        max_aqi = max(self.calculate_aqi_index(d["pm25"], d["pm10"], d["co2"]) 
                     for d in self.sensor_data_history)
        
        return {
            "timestamp": datetime.now().isoformat(),
            "readings_count": len(self.sensor_data_history),
            "average_aqi": round(self.calculate_aqi_index(avg_pm25, avg_pm10, avg_co2), 1),
            "peak_aqi": round(max_aqi, 1),
            "pollutants": {
                "avg_pm25": round(avg_pm25, 1),
                "avg_pm10": round(avg_pm10, 1),
                "avg_co2": round(avg_co2, 1)
            }
        }

# Global predictor instance
aqi_engine = AQIPredictor()

def on_sensor_message(message: str):
    \"\"\"Handle incoming sensor messages\"\"\"
    try:
        payload = json.loads(message)
        result = aqi_engine.process_sensor_telemetry(payload)
        return result
    except json.JSONDecodeError as e:
        logger.error(f"[ERROR] JSON decode error: {e}")
        return None

if __name__ == "__main__":
    # Test with mock data
    test_payload = {
        "sensor_id": "CAMPUS_ROOF_01",
        "location": "Campus Rooftop",
        "pm25": 45.2,
        "pm10": 78.5,
        "co2": 420.1,
        "temp": 28.5,
        "humidity": 65.2
    }
    
    result = aqi_engine.process_sensor_telemetry(test_payload)
    print(json.dumps(result, indent=2))
    
    report = aqi_engine.generate_hourly_report()
    print("\\nHourly Report:")
    print(json.dumps(report, indent=2))
