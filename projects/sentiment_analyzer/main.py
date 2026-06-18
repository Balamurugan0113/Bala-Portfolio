from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import json
from classifier import SentimentClassifier

app = FastAPI(title="Campus Sentiment Streams")
classifier = SentimentClassifier()

class ConnectionManager:
    """Manages active WebSockets connections from campus dashboards."""
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/feedback")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Receive text feed from students
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            message_text = payload.get("message", "")
            channel = payload.get("channel", "general")
            
            # Real-time sentiment classification
            sentiment, confidence = classifier.predict(message_text)
            
            result = {
                "message": message_text,
                "channel": channel,
                "sentiment": sentiment,
                "confidence": round(confidence, 4),
                "timestamp": payload.get("timestamp")
            }
            
            # Broadcast metrics to UI clients
            await manager.broadcast(json.dumps(result))
            
            # Anomaly alert logic for sudden negative spikes
            if sentiment == "NEGATIVE" and confidence > 0.85:
                print(f"[ALERT] High negative confidence ({confidence:.2f}) on channel '{channel}': {message_text}")
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("[INFO] Dashboard disconnected.")
