import nidsMain from "../projects/intrusion_detection/nids.py?raw";
import nidsRules from "../projects/intrusion_detection/rules.json?raw";
import nidsReadme from "../projects/intrusion_detection/README.md?raw";

import attendanceApp from "../projects/attendance_system/app.py?raw";
import attendanceFaceUtils from "../projects/attendance_system/face_utils.py?raw";
import attendanceSchema from "../projects/attendance_system/schema.sql?raw";
import attendanceReadme from "../projects/attendance_system/README.md?raw";

import sentimentMain from "../projects/sentiment_analyzer/main.py?raw";
import sentimentClassifier from "../projects/sentiment_analyzer/classifier.py?raw";
import sentimentReadme from "../projects/sentiment_analyzer/README.md?raw";

import aqiPredictor from "../projects/aqi_predictor/aqi_predictor.py?raw";
import aqiSensorSimulator from "../projects/aqi_predictor/sensor_simulator.py?raw";
import aqiAlertClient from "../projects/aqi_predictor/alert_client.py?raw";
import aqiReadme from "../projects/aqi_predictor/README.md?raw";

import signInferencePipeline from "../projects/sign_translator/inference_pipeline.py?raw";
import signModelTrain from "../projects/sign_translator/model_train.py?raw";
import signClasses from "../projects/sign_translator/classes.txt?raw";
import signReadme from "../projects/sign_translator/README.md?raw";

import digitCNN from "../projects/digit_recognition/cnn_model.py?raw";
import digitInference from "../projects/digit_recognition/inference.py?raw";
import digitReadme from "../projects/digit_recognition/README.md?raw";

import intelliqMain from "../projects/intelliq/main.py?raw";
import intelliqModels from "../projects/intelliq/models.py?raw";
import intelliqReadme from "../projects/intelliq/README.md?raw";

import genAiAgent from "../projects/gen_ai_assistant/langchain_agent.py?raw";
import genAiReadme from "../projects/gen_ai_assistant/README.md?raw";

import vibelyClient from "../projects/vibely_app/supabaseClient.js?raw";
import vibelyReadme from "../projects/vibely_app/README.md?raw";

import kanchipuramBot from "../projects/kanchipuram_bot/bot.py?raw";
import kanchipuramReadme from "../projects/kanchipuram_bot/README.md?raw";

import cardioPipeline from "../projects/cardio_ml/model_pipeline.py?raw";
import cardioReadme from "../projects/cardio_ml/README.md?raw";

export interface ProjectFile {
  name: string;
  language: string;
  content: string;
}

const DIGIT_FILES: ProjectFile[] = [
  { name: "cnn_model.py", language: "python", content: digitCNN },
  { name: "inference.py", language: "python", content: digitInference },
  { name: "README.md", language: "markdown", content: digitReadme }
];

export const PROJECT_FILES: Record<string, ProjectFile[]> = {
  "intelliq": [
    { name: "main.py", language: "python", content: intelliqMain },
    { name: "models.py", language: "python", content: intelliqModels },
    { name: "README.md", language: "markdown", content: intelliqReadme }
  ],
  "gen-ai-bot": [
    { name: "langchain_agent.py", language: "python", content: genAiAgent },
    { name: "README.md", language: "markdown", content: genAiReadme }
  ],
  "vibely": [
    { name: "supabaseClient.js", language: "javascript", content: vibelyClient },
    { name: "README.md", language: "markdown", content: vibelyReadme }
  ],
  "kanchipuram-bot": [
    { name: "bot.py", language: "python", content: kanchipuramBot },
    { name: "README.md", language: "markdown", content: kanchipuramReadme }
  ],
  "cardio-ml": [
    { name: "model_pipeline.py", language: "python", content: cardioPipeline },
    { name: "README.md", language: "markdown", content: cardioReadme }
  ],
  "digit-recognition": DIGIT_FILES,
  "handwritten-digit-recognition": DIGIT_FILES,
  "intrusion-detection": [
    { name: "nids.py", language: "python", content: nidsMain },
    { name: "rules.json", language: "json", content: nidsRules },
    { name: "README.md", language: "markdown", content: nidsReadme }
  ],
  "attendance-system": [
    { name: "app.py", language: "python", content: attendanceApp },
    { name: "face_utils.py", language: "python", content: attendanceFaceUtils },
    { name: "schema.sql", language: "sql", content: attendanceSchema },
    { name: "README.md", language: "markdown", content: attendanceReadme }
  ],
  "sentiment-analyzer": [
    { name: "main.py", language: "python", content: sentimentMain },
    { name: "classifier.py", language: "python", content: sentimentClassifier },
    { name: "README.md", language: "markdown", content: sentimentReadme }
  ],
  "aqi-detector": [
    { name: "aqi_predictor.py", language: "python", content: aqiPredictor },
    { name: "sensor_simulator.py", language: "python", content: aqiSensorSimulator },
    { name: "alert_client.py", language: "python", content: aqiAlertClient },
    { name: "README.md", language: "markdown", content: aqiReadme }
  ],
  "sign-translator": [
    { name: "inference_pipeline.py", language: "python", content: signInferencePipeline },
    { name: "model_train.py", language: "python", content: signModelTrain },
    { name: "classes.txt", language: "text", content: signClasses },
    { name: "README.md", language: "markdown", content: signReadme }
  ]
};