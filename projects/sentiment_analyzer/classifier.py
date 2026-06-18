from transformers import pipeline

class SentimentClassifier:
    def __init__(self):
        print("[INFO] Loading DistilBERT Sentiment Classifier...")
        # Load lightweight Transformer model for inference
        self.nlp = pipeline(
            "sentiment-analysis", 
            model="distilbert-base-uncased-finetuned-sst-2-english",
            device=-1 # Set to 0 for GPU
        )
        print("[INFO] Sentiment Transformer loaded.")

    def predict(self, text: str):
        """Analyzes text and returns sentiment category and float confidence."""
        if not text.strip():
            return "NEUTRAL", 1.0

        results = self.nlp(text)
        if not results:
            return "NEUTRAL", 1.0
            
        prediction = results[0]
        label = prediction["label"] # 'POSITIVE' or 'NEGATIVE'
        score = prediction["score"] # Float between 0.5 and 1.0
        
        return label, score
