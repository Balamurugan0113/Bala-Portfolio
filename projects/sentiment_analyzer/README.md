# Campus Feed Sentiment Analyzer

A WebSockets-backed Natural Language Processing (NLP) microservice designed to ingest real-time student reviews and campus forum feeds, classify tone using a DistilBERT model, and stream real-time metrics back to dashboard UI connections.

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Install Dependencies
This project uses FastAPI, WebSockets, and HuggingFace Transformers. Install the packages using pip:
```bash
pip install fastapi uvicorn websockets transformers torch
```

*Note: On first run, HuggingFace will automatically download the lightweight `distilbert-base-uncased-finetuned-sst-2-english` model files (~268 MB) and cache them locally.*

### Step 2: Start the FastAPI Server
Launch the application server on port 8000:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
Upon launching, the console will print:
```bash
[INFO] Loading DistilBERT Sentiment Classifier...
[INFO] Sentiment Transformer loaded.
INFO:     Started server process [12345]
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Step 3: Test WebSockets Stream
You can test the real-time endpoint (`ws://localhost:8000/ws/feedback`) using python or any WebSocket testing tool (e.g. Postman). 

To test using a simple Python script, create a file named `test_ws.py`:
```python
import asyncio
import websockets
import json

async def send_feedback():
    uri = "ws://localhost:8000/ws/feedback"
    async with websockets.connect(uri) as websocket:
        payload = {
            "message": "The new lab equipment is absolutely amazing!",
            "channel": "engineering_labs",
            "timestamp": 1680000000
        }
        await websocket.send(json.dumps(payload))
        
        # Listen for broadcasted sentiment
        response = await websocket.recv()
        print(f"Broadcasted Response: {response}")

asyncio.run(send_feedback())
```
Run `python test_ws.py`. The server console will process the feed and broadcast:
```json
{"message": "The new lab equipment is absolutely amazing!", "channel": "engineering_labs", "sentiment": "POSITIVE", "confidence": 0.9998, "timestamp": 1680000000}
```
If you send a negative message (e.g., `"The internet speed in block C is terrible."`), the server will log an alert trigger on the terminal:
```bash
[ALERT] High negative confidence (1.00) on channel 'general': The internet speed in block C is terrible.
```
