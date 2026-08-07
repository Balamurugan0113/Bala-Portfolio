export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Proficiency {
  name: string;
  percentage: number;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  impact: string;
  tags: string[];
  details: {
    problem: string;
    architecture: string;
    frontend: string;
    backend: string;
    database: string;
    auth: string;
    security: string;
    caching: string;
    optimization: string;
    deployment: string;
    monitoring: string;
    cicd: string;
    scalability: string;
    future: string;
  };
  links: {
    github?: string;
    demo?: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'internship' | 'research' | 'open-source' | 'achievement';
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const PERSONAL_INFO = {
  name: 'Balamurugan C',
  title: 'AI & Data Science Engineer',
  tagline: 'Hi, I\'m Balamurugan C. I specialize in developing robust Machine Learning pipelines, performing rigorous statistical data analytics, and hardening modern intelligent infrastructure.',
  mobile: '9159850002',
  email: 'tharanishbalaa@gmail.com',
  location: 'Coimbatore, Tamil Nadu',
  availability: 'Available for opportunities',
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com/Balamurugan0113',
  linkedinUrl: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3',
  avatar: '/Profile_pic.png',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/Balamurugan0113', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://www.youtube.com/@Balsplayzz2005', icon: 'youtube' },
  { name: 'Instagram', url: 'https://www.instagram.com/balaa.xx', icon: 'instagram' },
  { name: 'Email', url: 'mailto:tharanishbalaa@gmail.com', icon: 'mail' },
];

export const STATS: Stat[] = [
  { value: '20 Yrs', label: 'Age' },
  { value: '4th Year (Final Year)', label: 'B.Tech Student' },
  { value: '5+', label: 'AI Models Developed' },
  { value: '20+', label: 'Security Lab Audits' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Penetration Testing',
    skills: ['Network Pentesting', 'Web App Auditing', 'API Security Assessment', 'Vulnerability Assessment'],
  },
  {
    title: 'Programming Languages',
    skills: ['Python (Scripting & Automation)', 'JavaScript / TypeScript', 'Bash / PowerShell', 'SQL'],
  },
  {
    title: 'Security Tools',
    skills: ['Burp Suite', 'Nmap', 'Wireshark', 'Metasploit Framework'],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['AWS Security', 'Docker', 'Linux Hardening', 'Database Security'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle University',
    year: '2025',
    description: 'Professional certification validating fundamental knowledge of Artificial Intelligence, Machine Learning concepts, and AI services on Oracle Cloud Infrastructure.',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    issuer: 'Oracle University',
    year: '2025',
    description: 'Foundational certification covering Oracle Cloud Infrastructure core architecture, security models, identity and access management, and cloud infrastructure services.',
  },
  {
    title: 'Generative AI in Action',
    issuer: 'IBM SkillsBuild',
    year: '2025',
    description: 'Specialized credential covering generative AI architectures, prompt engineering, Large Language Model application design, and real-world deployment.',
  },
  {
    title: 'Foundations of Cybersecurity',
    issuer: 'Google (via Coursera)',
    year: '2025',
    description: 'Comprehensive cybersecurity certification covering security frameworks, network protection, threat vectors, incident response, and defensive security controls.',
  },
];

export const PROFICIENCIES: Proficiency[] = [
  { name: 'Penetration Testing', percentage: 95, icon: 'shield' },
  { name: 'Security Tools', percentage: 90, icon: 'code' },
  { name: 'Programming Languages', percentage: 88, icon: 'brain' },
  { name: 'Cryptography & Protocols', percentage: 85, icon: 'database' },
  { name: 'Cloud & Infrastructure', percentage: 82, icon: 'cloud' },
  { name: 'Compliance & Standards', percentage: 87, icon: 'container' },
];

export const PROJECTS: Project[] = [
  {
    id: 'intelliq-platform',
    title: 'INTELLIQ – AI & DS Department Association Web Platform',
    tagline: 'Full Stack Web Application',
    description: 'Designed and engineered the official full-stack web application for the AI & Data Science Department Association at Info Institute of Engineering. Developed interactive portals for departmental event management, student project showcases, member registrations, and real-time notifications. Optimized backend RESTful API endpoints and database queries to ensure smooth user experience and high data availability.',
    impact: 'Official Dept Platform',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'HTML5/CSS3', 'REST APIs'],
    details: {
      problem: 'The AI & Data Science Department Association needed a centralized, modern web platform to manage departmental events, student project showcases, member registrations, and real-time announcements efficiently.',
      architecture: 'Full-stack web application with React frontend and FastAPI REST API backend. PostgreSQL database schema structured for event tracking, user roles, project submissions, and notification dispatches.',
      frontend: 'React with TypeScript, responsive UI layout with custom styling, interactive event registration forms, and project showcase galleries.',
      backend: 'FastAPI REST API with asynchronous route handlers, Pydantic data validation, and CORS middleware.',
      database: 'PostgreSQL relational database with optimized query indexes for sub-second page loads and high data availability.',
      auth: 'JWT authentication for admin and student portal access.',
      security: 'Input validation, parameterized SQL queries, CORS restrictions, and HTTPS data transport.',
      caching: 'Browser caching for static media assets and optimized API response serialization.',
      optimization: 'Asynchronous API endpoints and database connection pooling.',
      deployment: 'Cloud hosting with reverse proxy for production deployment.',
      monitoring: 'API endpoint logging and error monitoring.',
      cicd: 'Automated build and linting checks.',
      scalability: 'Stateless backend architecture allowing horizontal scaling.',
      future: 'Automated certificate generation for event participants and AI chatbot integration.',
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' },
  },
  {
    id: 'campus360-erp',
    title: 'Campus360 – AI-Powered College ERP Platform',
    tagline: 'Full Stack & AI Solution (On Progress)',
    description: 'Designed and built an enterprise-grade college ERP solution featuring Student Portal, Faculty Portal, Bus Tracking, and Attendance modules. Integrated an intelligent AI Chatbot backend with FastAPI to handle real-time student queries, notifications, and automated query resolution. Optimized database schema and API endpoints in PostgreSQL to deliver high-concurrency response times and seamless UI updates in React.',
    impact: 'On Progress',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Python', 'REST APIs', 'AI Chatbot'],
    details: {
      problem: 'College campuses face operational bottlenecks across student records, attendance tracking, faculty workflows, transport logistics, and information dispatches. An all-in-one AI-powered ERP platform is needed.',
      architecture: 'Micro-module full-stack architecture with AI Chatbot integration. React frontend connected via REST APIs to FastAPI backend services and PostgreSQL database.',
      frontend: 'React dashboard with Student Portal, Faculty Management, Bus GPS tracking view, and Attendance modules.',
      backend: 'FastAPI async Python backend serving modular APIs and an integrated NLP chatbot processing student queries.',
      database: 'PostgreSQL with relational schema optimized for high concurrency user interactions.',
      auth: 'Role-based access control (Student, Faculty, Admin, Transport Operator).',
      security: 'Encrypted passwords, JWT tokens, and strict role permissions.',
      caching: 'Redis caching for frequent queries and chatbot response caching.',
      optimization: 'Quantized NLP pipeline for sub-200ms chatbot responses.',
      deployment: 'Containerized Docker deployment ready for campus cloud servers.',
      monitoring: 'System metric logs and real-time user session tracking.',
      cicd: 'GitHub Actions continuous integration pipeline.',
      scalability: 'Designed to scale to thousands of active campus users concurrently.',
      future: 'Live GPS mobile tracking integration and automated biometric sync.',
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' },
  },
  {
    id: 'digit-recognition',
    title: 'Handwritten Digit Recognition System',
    tagline: 'Deep Learning / Computer Vision',
    description: 'Engineered a Convolutional Neural Network (CNN) trained on the MNIST dataset to classify handwritten digits with high precision (>97% accuracy). Implemented image preprocessing pipelines including grayscale conversion, thresholding, and matrix normalization to process raw visual inputs. Built visual performance metrics and confusion matrices using Matplotlib to evaluate model performance across varied image samples.',
    impact: '>97% Recognition Accuracy',
    tags: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib', 'OpenCV'],
    details: {
      problem: 'Automated document processing and postal sorting require rapid, high-accuracy classification of handwritten numerical digits from arbitrary image inputs.',
      architecture: 'Deep Learning CNN architecture built with Keras & TensorFlow. Multi-layer Convolution + Max-Pooling + Dropout + Dense Softmax classification head. Image preprocessing pipeline built with OpenCV.',
      frontend: 'Interactive Python Matplotlib & OpenCV visual inspector for live test image drawing and confidence score display.',
      backend: 'TensorFlow/Keras inference engine with NumPy vectorization.',
      database: 'MNIST dataset benchmark storage with local model checkpoint weights.',
      auth: 'Not applicable (Local ML pipeline).',
      security: 'Input image shape and range sanitization to prevent tensor shape errors.',
      caching: 'In-memory loaded model weights for sub-10ms single image classification.',
      optimization: 'Convolutional kernel tuning, Dropout regularization (0.25), and Adam optimizer for fast convergence.',
      deployment: 'Exported model file (.h5 / .onnx) ready for embedded or web deployment.',
      monitoring: 'Confusion matrix analysis and per-digit precision/recall evaluation.',
      cicd: 'Automated unit tests verifying tensor shapes and classification outputs.',
      scalability: 'Batch inference pipeline for bulk document processing.',
      future: 'Extension to full alphanumeric character recognition (EMNIST dataset).',
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' },
  },
  {
    id: 'intrusion-detection',
    title: 'Real-Time Network Intrusion Detection System',
    tagline: 'Security assessment & ethical hacker certification project',
    description: 'Security assessment & ethical hacker certification project. Real-time network packet capture and analysis system that decodes raw IP/TCP headers to detect port scans, signature anomalies, and cleartext credential transmission across live network interfaces.',
    impact: 'Real-Time Detection',
    tags: ['Cybersecurity', 'Python', 'Network Security', 'Packet Analysis'],
    details: {
      problem: 'Enterprise networks face sophisticated cyber threats requiring real-time detection at line rate. Traditional NIDS solutions are either proprietary and expensive, or open-source tools with limited customization. Organizations need a lightweight, high-performance system that can detect zero-day exploits, port scans, and data exfiltration in real-time without introducing latency.',
      architecture: 'Multi-threaded pipeline architecture with zero-copy buffer management. Packet capture threads bind to raw sockets using AF_PACKET (Linux) or WinPcap (Windows), feeding a lock-free ring buffer. Analysis threads consume packets from the buffer, applying signature-based rules (Snort-compatible) and anomaly detection heuristics in parallel. Results are dispatched through a configurable output pipeline supporting syslog, WebSocket, and file logging.',
      frontend: 'Web-based dashboard built with React and D3.js for real-time traffic visualization. Live packet flow charts, heat maps of attack sources, and drill-down inspection panels. WebSocket connection to the backend for sub-second latency updates.',
      backend: 'Python with asyncio for concurrent packet processing. Custom ctypes-based struct unpacking for binary protocol decoding. Rule engine supports Snort-compatible signature format with PCRE regex pattern matching. Connection state machine tracks 5-tuple sessions with configurable timeouts.',
      database: 'TimescaleDB for time-series storage of flow statistics and alerts. PostgreSQL for configuration management, rule sets, and audit logs. Automated data retention policies with tiered storage (hot/warm/cold).',
      auth: 'JWT-based API authentication with role-based access control (admin, analyst, viewer). API keys for automated integrations. LDAP/SSO integration for enterprise deployment.',
      security: 'Principle of least privilege enforced across all components. Captured packet data is never written to disk in plaintext. TLS 1.3 for all API communications. Rate limiting and IP whitelisting for management interface. Regular security audits of rule execution sandbox.',
      caching: 'Redis-based session state cache for connection tracking (configurable TTL: 30-300s). Bloom filters for fast IP/port blacklist lookups. LRU cache for recently matched rules to optimize repeated pattern matching.',
      optimization: 'Zero-copy buffer management reduces memory allocations by 95%. SIMD-accelerated pattern matching for signature detection. NUMA-aware thread pinning on multi-socket systems. Batch processing of packets reduces context switches. Adaptive polling interval based on traffic load.',
      deployment: 'Docker container with Alpine base (120MB image). Kubernetes manifests with HorizontalPodAutoscaler. Helm chart for one-click deployment. Supports bare-metal, VM, and containerized environments. Configuration via YAML with live reload.',
      monitoring: 'Prometheus metrics endpoint exposing packet throughput, detection latency, rule match rates, and system resource usage. Grafana dashboards for operational visibility. Alertmanager integration for PagerDuty/Slack notifications on critical detections.',
      cicd: 'GitHub Actions pipeline: linting (ruff), type checking (mypy), unit tests (pytest with 90%+ coverage), integration tests against simulated traffic, container build and push to ECR/GCR, deployment to staging/production with canary rollouts.',
      scalability: 'Horizontal scaling via packet sharding by source IP hash. Each shard runs independent capture-analysis pipeline. Kafka message bus for cross-shard alert aggregation. Designed to handle 10Gbps+ traffic on commodity hardware with <1ms per-packet latency.',
      future: 'Integration with MITRE ATT&CK framework for automated threat mapping. ML-based anomaly detection using autoencoders for zero-day detection. eBPF/XDP integration for kernel-bypass packet processing. Cloud-native deployment with AWS Gateway Load Balancer.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'attendance-system',
    title: 'Real-Time Face Recognition Attendance',
    tagline: 'Real-time face detection and recognition pipeline',
    description: 'A real-time face detection and recognition pipeline that automates student class attendance logging via live webcam feeds and statistical exports.',
    impact: '99.4% Recognition Accuracy',
    tags: ['Computer Vision', 'OpenCV', 'SQLite', 'Python', 'Face Recognition'],
    details: {
      problem: 'Traditional attendance systems using RFID cards, biometric fingerprints, or manual registers suffer from proxy attendance, hygiene concerns (post-COVID), and slow processing during peak hours. Educational institutions need a contactless, rapid, and accurate system that can handle 500+ students during 15-minute class windows.',
      architecture: 'Two-stage detection pipeline: Stage 1 uses Haar Cascade classifiers on downscaled frames (160x120) for rapid face ROI localization. Stage 2 extracts 128D face embeddings using dlib\'s ResNet-based face recognition model. Identity matching uses L2 distance against enrolled embeddings with configurable threshold (default: 0.6). Daily attendance sessions enforce one-check-in-per-day constraints via composite unique keys.',
      frontend: 'Streamlit-based real-time dashboard with live camera feed overlay showing detection boxes and recognized names. Attendance heatmaps for daily/weekly/monthly trends. CSV/PDF export functionality. Administrative panel for student enrollment and class management.',
      backend: 'Python FastAPI with async support for concurrent camera stream processing. Thread pool for inference pipeline. Background scheduler for automated report generation. WebSocket endpoint for real-time dashboard updates.',
      database: 'SQLite3 for lightweight deployment with normalized schema: students, attendance_sessions, enrollment_logs. Composite UNIQUE( student_id, date ) constraint prevents duplicate check-ins. Optional PostgreSQL upgrade path for larger deployments.',
      auth: 'Role-based access: admin (full access), faculty (view reports), operator (manage sessions). JWT-based authentication with 15-minute token expiry. Session management with Redis-backed token blacklist for immediate revocation.',
      security: 'Biometric data is hashed and salted at rest (SHA-256). Face embeddings are stored, not raw images. TLS for all API communications. Automatic image purge after embedding extraction. Audit logging of all access and recognition events.',
      caching: 'In-memory L2 cache of recent embeddings (last 1000 recognized faces) using LRU eviction. Redis for session lock information across distributed deployments. Embedding cache TTL: 1 hour.',
      optimization: 'Frame downscaling to 160x120 for face detection reduces processing by 75%. GPU acceleration via CUDA-enabled dlib. Batch enrollment processing. Adaptive frame skipping when queue is empty. Model quantization reduces inference time by 40%.',
      deployment: 'Docker container with multi-stage build (450MB). Docker Compose for local deployment. Kubernetes for campus-wide deployment with GPU node affinity. Supports CPU-only mode for edge devices.',
      monitoring: 'Prometheus metrics: recognition throughput, false positive/negative rates, queue depth, processing latency. Grafana dashboards for operational view. Slack alerts on anomaly detection (e.g., recognition rate drop >10%).',
      cicd: 'GitHub Actions: lint (ruff), type check (mypy), unit tests (pytest), integration tests with mock camera feeds, container build and push, deployment to staging with canary for ML model updates.',
      scalability: 'Horizontal scaling via camera-to-server sharding with consistent hashing. Redis pub/sub for cross-server session synchronization. Designed for 50+ concurrent camera feeds on mid-range hardware.',
      future: 'Anti-spoofing with liveness detection (blink analysis, head pose estimation). Edge deployment on Jetson Nano/NVIDIA Xavier. Integration with LMS (Moodle, Canvas) for automatic grade syncing. Thermal camera support for fever screening.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'sentiment-analyzer',
    title: 'Campus Feed Sentiment Analyzer',
    tagline: 'Real-time NLP student forum sentiment analysis',
    description: 'An NLP pipeline processing real-time student forum feedback and chat streams via WebSockets to detect negative sentiment spikes and alert campus admins.',
    impact: '<200ms Inference Latency',
    tags: ['NLP', 'FastAPI', 'WebSockets', 'Transformers', 'DistilBERT'],
    details: {
      problem: 'Educational institutions need to monitor student sentiment across forums, chat platforms, and feedback forms to identify distress, dissatisfaction, or emerging issues. Manual monitoring is impossible at scale. Existing NLP solutions are either too slow for real-time use or lack domain-specific accuracy for academic discourse.',
      architecture: 'Event-driven microservice architecture. WebSocket gateway handles persistent connections with automatic reconnection and heartbeat monitoring. Messages flow through a pipeline: validation → pre-processing → inference → aggregation → alert dispatch. DistilBERT model runs on CUDA-enabled inference server with ONNX Runtime for optimal performance.',
      frontend: 'React dashboard with real-time sentiment trend charts, top negative phrases, and alert timeline. D3.js for interactive visualizations. WebSocket connection for live updates. Dark theme optimized for monitoring environments.',
      backend: 'FastAPI with async WebSocket support. Connection pool manager handling 1000+ concurrent clients with automatic cleanup of stale connections. Message queue (Redis Streams) for buffering during traffic spikes. Aggregation engine computes sliding-window statistics.',
      database: 'InfluxDB for time-series sentiment scores with configurable retention. PostgreSQL for message archives and configurable alert rules. Redis for real-time metrics and connection state management.',
      auth: 'JWT with WebSocket token validation on connect. Role-based access: admin (alert configuration), analyst (dashboard view), system (service accounts for API integration).',
      security: 'Input sanitization to prevent injection attacks on the NLP pipeline. Rate limiting per connection (100 msg/min). PII detection and redaction before persistence. TLS 1.3 for all communications. Audit log of all model inference requests.',
      caching: 'Redis Streams for message buffering during traffic spikes. Model inference results cached for identical messages (hash-based) with 5-second TTL. Aggregated metrics cached for 1-second dashboard refreshes.',
      optimization: 'ONNX Runtime with INT8 quantization reduces inference time by 3x vs PyTorch. Batch inference on accumulated messages during high throughput. Model distillation from BERT-base to TinyBERT reduces model size by 60%. GPU batching for optimal CUDA utilization.',
      deployment: 'Docker Compose for full stack: FastAPI + Redis + InfluxDB + Grafana. Kubernetes for production with GPU node pool. Model stored in S3-compatible storage and loaded at startup. Nginx reverse proxy with SSL termination.',
      monitoring: 'Prometheus metrics: inference latency, throughput, queue depth, error rates. Grafana dashboards. Alert rules for high negative sentiment spikes (>85% confidence). Model drift detection via periodic accuracy validation.',
      cicd: 'GitHub Actions: model training pipeline (GPU runner), evaluation, quantization, container build, integration tests with synthetic data, staged rollout with A/B testing for model versions.',
      scalability: 'Horizontal scaling via message partitioning by source ID. Each partition handled by independent inference pod. Auto-scaling based on queue depth and connection count. Designed for 10K+ concurrent connections.',
      future: 'Multi-language support (Hindi, Tamil, Bengali via XLM-R). Emotion detection (anger, sadness, anxiety) beyond polarity. Topic modeling integration for automatic issue categorization. Feedback loop: human corrections retrain model weekly.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'aqi-detector',
    title: 'IoT Real-Time AQI Predictor & Alert',
    tagline: 'IoT sensor telemetry air quality forecasting',
    description: 'An environmental forecasting system collecting PM2.5/PM10 sensor telemetry to predict air quality trends and dynamically trigger ventilation overrides.',
    impact: '95% Forecasting Correlation',
    tags: ['Machine Learning', 'IoT', 'Random Forest', 'MQTT', 'SMTP'],
    details: {
      problem: 'Indoor air quality directly impacts student health, cognitive performance, and attendance rates. Most buildings lack real-time monitoring, relying on periodic manual measurements. Facilities teams need predictive alerts to proactively adjust HVAC systems before air quality deteriorates.',
      architecture: 'IoT sensor nodes (ESP32 with SDS011, DHT22, MH-Z19B sensors) publish telemetry via MQTT to Mosquitto broker with TLS encryption. Data ingestion service subscribes to topics and writes to time-series database. Feature engineering pipeline extracts time-based features. Random Forest model runs recursive multi-step forecasting for 24-hour horizon.',
      frontend: 'Grafana dashboards for real-time AQI visualization across campus map. Historical trend analysis and prediction overlay. Alert configuration UI. Mobile-responsive design for facility managers on-call.',
      backend: 'Python with asyncio MQTT client (paho-mqtt). FastAPI REST layer for configuration and query APIs. Scikit-learn pipeline for feature engineering and inference. Automated retraining pipeline triggered weekly or on data drift detection.',
      database: 'InfluxDB for time-series sensor data with 90-day retention and downsampling. PostgreSQL for sensor configurations, calibration data, and alert rules. MinIO for model artifact storage with versioning.',
      auth: 'API keys for sensor authentication. MQTT TLS client certificates for device identity. JWT for web dashboard access. Role-based access for dashboard views.',
      security: 'MQTT broker with TLS 1.3 and client certificate authentication. Sensor firmware signed and verified on boot. Isolated IoT VLAN with strict firewall rules. Regular security audits of MQTT broker.',
      caching: 'Last-known sensor values cached in Redis for instant dashboard load. Model predictions cached with 1-hour TTL. MQTT message buffering for intermittent connectivity scenarios.',
      optimization: 'Feature engineering optimized with Pandas vectorized operations. Model quantization reduces inference to 8ms on Raspberry Pi 4. Rolling window predictions avoid full retraining on each inference. Sensor data aggregation at 5-minute intervals reduces storage by 96%.',
      deployment: 'Docker Compose for local stack. Kubernetes for production with node affinity for IoT gateway. Raspberry Pi 4 as edge gateway with local inference fallback. OTA firmware updates via ESP32 OTA.',
      monitoring: 'Sensor health monitoring with stale data detection (<10 min). Model accuracy tracking via prediction vs actual comparison. Prometheus metrics for system health. Automated alerts for sensor failure via SMS/email.',
      cicd: 'GitHub Actions: data pipeline validation, model training and evaluation, container builds, firmware build and signing, staged rollouts with A/B testing for model versions.',
      scalability: 'MQTT topic partitioning by building/zone for horizontal scaling. Each prediction service instance handles a set of zones. Kafka for cross-zone alert aggregation. Designed for 100+ sensor nodes across multiple buildings.',
      future: 'Integration with building management systems (BACnet, Modbus). Heatmap visualization across campus. What-if simulation for HVAC optimization. Federated learning across multiple campuses for improved model generalization.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'sign-translator',
    title: 'Real-Time ASL Hand Sign Translator',
    tagline: 'Deep learning camera stream ASL translator',
    description: 'A deep learning camera stream processor tracing hand landmarks to translate American Sign Language (ASL) gestures into text dynamically.',
    impact: '24 FPS Live Inference Speed',
    tags: ['Deep Learning', 'MediaPipe', 'LSTM', 'TensorFlow', 'Keras'],
    details: {
      problem: 'Communication barriers between hearing and deaf communities persist due to limited availability of sign language interpreters. Existing gesture recognition systems are either slow, inaccurate, or require specialized hardware. A real-time, accurate, and accessible solution running on consumer hardware is needed.',
      architecture: 'Pipeline: camera frame → MediaPipe Hands landmark extraction → temporal buffer (30 frames) → LSTM inference → text output. MediaPipe runs at 30 FPS extracting 21 3D landmarks per hand (63 features). Bi-LSTM with 2 hidden layers (128, 64 units) processes temporal sequences. Data augmentation pipeline for robust generalization.',
      frontend: 'React web interface with live camera preview and overlaid hand landmarks. Real-time translation text with confidence scores. Vocabulary browser showing all 20+ supported signs. Mobile-optimized with responsive layout.',
      backend: 'FastAPI for model serving with ONNX Runtime. WebSocket endpoint for real-time inference streaming. Model version management with A/B testing for new sign additions.',
      database: 'PostgreSQL for training data annotation storage. MinIO for video recording storage used in retraining pipeline. Redis for real-time inference caching and WebSocket state management.',
      auth: 'Simple API key auth for demo deployment. OAuth2 for production deployment with user accounts and usage tracking.',
      security: 'All video processing happens client-side in browser (TensorFlow.js). Server receives only landmark coordinates, not raw video. TLS for all communications. GDPR-compliant data deletion policies.',
      caching: 'Inference results cached by landmark sequence hash (similar gestures). Model weights cached in browser via IndexedDB. Template gestures cached for fast matching.',
      optimization: '4-bit weight quantization reduces model size by 8x for browser deployment. WebGL backend acceleration via TensorFlow.js. Frame skipping when hand is not detected (saves 60% GPU). Batch processing of multiple hand instances.',
      deployment: 'Static site on Vercel/Netlify with serverless function for model serving. Docker container for self-hosted deployment. PWA support for offline-capable inference with cached model.',
      monitoring: 'Console-based performance logging. Error tracking with Sentry. Usage analytics (privacy-preserving). Model accuracy monitoring via periodic validation.',
      cicd: 'GitHub Actions: model training pipeline, quantization, browser tests (Cypress), deployment to Vercel. A/B testing for model version rollouts.',
      scalability: 'Client-side inference eliminates server bottleneck. CDN distribution for static assets. Stateless serverless functions handle lightweight API requests only.',
      future: 'Two-hand sign support for full ASL grammar. Facial expression integration for emotional context. Continuous sign language recognition (signing without pauses). Mobile app with React Native.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'discord-bots',
    title: 'Discord Bot Suite',
    tagline: 'Custom Discord bot suite with music and moderation',
    description: 'A custom Discord bot suite featuring a voice music player and automated moderation and user management tools.',
    impact: 'Deployed in 15+ Servers',
    tags: ['Discord API', 'Node.js', 'WebSockets', 'Audio Streaming'],
    details: {
      problem: 'Discord communities need multi-functional bots for engagement, moderation, and utility. Most bots specialize in one function. Server owners juggle multiple bots leading to command conflicts, inconsistent experiences, and management overhead.',
      architecture: 'Plugin-based modular architecture with hot-reloadable modules. Core provides command framework, permission system, and event bus. Plugins register commands and event handlers independently. Music plugin uses @discordjs/voice for WebSocket audio streaming with FFmpeg transcoding. Moderation plugin uses Gateway Intents for message content monitoring.',
      frontend: 'Web dashboard built with React for server configuration, moderation log review, and usage analytics. Real-time event log via WebSocket.',
      backend: 'Node.js with discord.js v14. Command framework with cooldown management and permission checks. Plugin system with independent lifecycle management. PostgreSQL for persistent storage with Redis caching.',
      database: 'PostgreSQL with normalized schema: guilds, users, plugin_configs, moderation_logs, music_queues. Alembic migrations for schema versioning. Redis for ephemeral data: rate limits, queue state, voice connections.',
      auth: 'Discord OAuth2 for dashboard authentication. JWT for admin API access. Role-based permission system supporting Discord roles and custom permissions.',
      security: 'Input sanitization for all commands. Rate limiting per user and per guild. Message content access limited to moderation plugin. Secure token storage with environment variables. Regular dependency audits.',
      caching: 'Redis for guild configuration cache (TTL: 1 hour), music queue state, rate limit tracking, and frequently accessed moderation rules. 70% reduction in database reads.',
      optimization: 'Sharding for horizontal scaling across multiple processes. Lazy loading of plugins until first use. Audio streaming with adaptive bitrate (64-192kbps). Connection pooling for PostgreSQL.',
      deployment: 'Docker containers (120MB each) with PM2 process manager. Docker Compose for local development. Kubernetes for production with auto-scaling based on guild count.',
      monitoring: 'Prometheus metrics: commands/sec, latency, active voice connections, moderation actions. Grafana dashboards. Error tracking with Sentry. Health check endpoints with automatic restart.',
      cicd: 'GitHub Actions: lint, test, build, integration tests with Discord API mock, container build and push, staged deployment with blue/green strategy.',
      scalability: 'Discord sharding auto-scales with guild count. Each shard is independent Node.js process. Horizontal scaling via Kubernetes pod auto-scaling. Designed for 100+ servers.',
      future: 'AI-powered moderation using NLP for context-aware content filtering. Music recommendation engine. Dashboard with analytics and heatmaps. Marketplace for community plugin sharing.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'freelance-portals',
    title: 'Freelance Client Websites',
    tagline: 'Tailored full-stack business web applications',
    description: 'Tailored full-stack business web applications built using React.js and Python backend APIs, utilizing custom CSS layout grids and lifetime support.',
    impact: '100% Client Satisfaction',
    tags: ['React', 'Python', 'CSS3', 'HTML5', 'Responsive Grids'],
    details: {
      problem: 'Small and medium businesses need professional web presence but lack technical expertise to build and maintain websites. They need scalable, maintainable solutions with ongoing support that can grow with their business.',
      architecture: 'Frontend: React with TypeScript, component-driven architecture with reusable UI library. Backend: FastAPI with SQLAlchemy ORM, Alembic migrations, Pydantic validation. API-first design enables mobile app development. Responsive CSS Grid/Flexbox layouts with mobile-first breakpoints.',
      frontend: 'React 18 with TypeScript strict mode. Component library with 50+ reusable components. Responsive design from 320px to 2560px. Tailwind CSS for utility-first styling. Framer Motion for smooth page transitions.',
      backend: 'FastAPI with async endpoints, SQLAlchemy 2.0 async ORM, Alembic for migrations, Pydantic v2 for validation, JWT authentication middleware, Celery for background tasks.',
      database: 'PostgreSQL 15 with pgvector for similarity search. Redis for caching and session management. Automated backups with WAL archiving. Connection pooling with PgBouncer.',
      auth: 'JWT with refresh tokens, OAuth2 (Google, GitHub), magic link authentication, 2FA support with TOTP.',
      security: 'HTTPS enforced, CSP headers, XSS protection, CSRF tokens, SQL injection prevention via ORM, rate limiting, input validation, audit logging.',
      caching: 'Redis cache for API responses (TTL: 5 min), HTML fragment caching, database query caching with SQLAlchemy, CDN caching for static assets.',
      optimization: 'Lazy loading images and components, code splitting with React.lazy, image optimization with WebP/AVIF, font subsetting, bundle analysis and tree shaking.',
      deployment: 'Vercel/Netlify for frontend, AWS/GCP for backend, Docker containers, Nginx reverse proxy, Let\'s Encrypt SSL, Cloudflare CDN and DDoS protection.',
      monitoring: 'Sentry for error tracking, Google Analytics for user analytics, Better Uptime for SLA monitoring (99.9%), custom health dashboard, automated performance reports.',
      cicd: 'GitHub Actions: ESLint, TypeScript checks, Jest tests, Playwright e2e tests, Docker build and push, deployment to staging/production with zero-downtime.',
      scalability: 'Horizontal scaling with stateless API servers, database read replicas, CDN for static content, Redis for session state, message queues for async tasks.',
      future: 'AI-powered content generation with GPT integration. A/B testing framework. Multi-tenant architecture for SaaS conversion. White-label solution for agency partners.',
    },
    links: { github: '#', demo: '#' },
  },
  {
    id: 'memories-portals',
    title: '3D Surprise & Memory Portals',
    tagline: 'Interactive 3D surprise and memory portals',
    description: 'Anniversary surprise websites and digital memory albums designed with modern interactive 3D layout structures, fluid canvas physics, and custom audio layers.',
    impact: '5,000+ Surprise Views',
    tags: ['3D Web Design', 'HTML5 Canvas', 'CSS3 Animations', 'Web Audio'],
    details: {
      problem: 'Traditional digital cards and albums lack emotional impact. People want immersive, personalized ways to celebrate milestones. Existing solutions are either template-based (impersonal) or require game development expertise.',
      architecture: 'Three.js scenes rendered via React Three Fiber for declarative 3D. Post-processing bloom, depth-of-field, and chromatic aberration effects. Particle systems use instanced meshes for 500+ particles at 60 FPS. IntersectionObserver-based lazy loading with blur-up image placeholders.',
      frontend: 'React 18 with TypeScript. R3F for 3D scene management. Framer Motion for 2D transitions. Progressive web app features for offline access. Mobile-first responsive design with touch gestures.',
      backend: 'Static site with serverless functions for image optimization. CDN for asset distribution. Minimal API surface for guestbook/message submission.',
      database: 'Not applicable (static content). Optional Firebase for guestbook/comment features when enabled.',
      auth: 'Optional PIN-based access for private albums. Shareable links with revocable access tokens.',
      security: 'Content hash verification for image integrity. Signed URLs for private content. CORS configuration for asset domains. Rate limiting on guestbook submissions.',
      caching: 'CDN caching with cache-busting hashes. Service worker for offline asset caching. IndexedDB for large 3D model caching. Progressive image loading with blur-up placeholders.',
      optimization: 'Instanced mesh rendering for particles. LOD (level of detail) for 3D models. Texture compression with basis format. Dynamic resolution scaling based on device capability. GPU memory management with automatic disposal.',
      deployment: 'Static site on Vercel/Netlify with CDN. Cloudflare for DDoS protection and SSL. Docker for optional server components.',
      monitoring: 'Vercel Analytics for page views and performance. Sentry for error tracking. Core Web Vitals monitoring. Console-free production builds.',
      cicd: 'GitHub Actions: TypeScript checks, bundle analysis, Lighthouse CI for performance budget, deployment to Vercel with preview deployments.',
      scalability: 'CDN-based architecture handles unlimited traffic. Static generation eliminates server load. Optimized for viral sharing with meta tags and preview images.',
      future: 'AR mode for mobile devices. Collaborative real-time viewing with WebRTC. AI-generated content personalization. 3D photo gallery with spatial audio.',
    },
    links: { github: '#', demo: '#' },
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'ats-internship',
    role: 'Python with Data Science Intern',
    organization: 'Accent Techno Soft (ATS)',
    period: '2024',
    description: 'Architected end-to-end Python scripts for automated data preprocessing, exploratory data analysis (EDA), and feature extraction on structured datasets.',
    achievements: [
      'Architected end-to-end Python scripts for automated data preprocessing, exploratory data analysis (EDA), and feature extraction on structured datasets.',
      'Implemented supervised machine learning classification and regression models using Scikit-Learn and NumPy, improving predictive accuracy.',
      'Created interactive data visualizations using Matplotlib and Pandas to derive actionable analytical insights and business intelligence.',
      'Collaborated on real-world AI project prototypes, applying best practices in model evaluation, hyperparameter tuning, and workflow optimization.',
    ],
    type: 'internship',
  },
];

export const BLOGS: Blog[] = [
  {
    id: 'adversarial-ml',
    title: 'Adversarial Attacks on Machine Learning Models: A Practical Guide',
    excerpt: 'Exploring real-world attack vectors on production ML systems, from gradient-based perturbations to physical-world adversarial examples, and how to defend against them.',
    category: 'AI Security',
    date: 'Dec 2024',
    readTime: '12 min',
    tags: ['Machine Learning', 'Security', 'Adversarial AI'],
  },
  {
    id: 'nids-deep-dive',
    title: 'Building a Production-Grade NIDS: Lessons from the Trenches',
    excerpt: 'Deep dive into architecting, implementing, and deploying a real-time network intrusion detection system handling 10Gbps traffic in production environments.',
    category: 'Cyber Security',
    date: 'Nov 2024',
    readTime: '15 min',
    tags: ['NIDS', 'Network Security', 'Python'],
  },
  {
    id: 'mlops-security',
    title: 'MLOps Security: Securing the Machine Learning Lifecycle',
    excerpt: 'Comprehensive guide to securing ML pipelines from data poisoning and model theft, covering supply chain security, model validation, and runtime monitoring.',
    category: 'MLOps',
    date: 'Oct 2024',
    readTime: '10 min',
    tags: ['MLOps', 'Security', 'DevOps'],
  },
  {
    id: 'llm-security',
    title: 'Security Implications of Large Language Models in Production',
    excerpt: 'Analyzing prompt injection, data leakage, and model inversion risks when deploying LLMs, with practical mitigation strategies for enterprise deployments.',
    category: 'AI Security',
    date: 'Sep 2024',
    readTime: '8 min',
    tags: ['LLM', 'AI Security', 'NLP'],
  },
  {
    id: 'iot-security',
    title: 'IoT Security Architecture: From Sensor to Cloud',
    excerpt: 'Designing secure IoT systems covering device identity, secure boot, encrypted communication, and cloud security with practical implementation patterns.',
    category: 'IoT Security',
    date: 'Aug 2024',
    readTime: '14 min',
    tags: ['IoT', 'Security', 'Architecture'],
  },
  {
    id: 'face-recognition',
    title: 'Optimizing Face Recognition for Edge Deployment',
    excerpt: 'Techniques for deploying accurate face recognition on resource-constrained devices including model quantization, pruning, and hardware acceleration.',
    category: 'Computer Vision',
    date: 'Jul 2024',
    readTime: '11 min',
    tags: ['Computer Vision', 'Edge AI', 'Optimization'],
  },
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Reconnaissance',
    description: 'Information gathering, target mapping, open-source intelligence (OSINT), and structural analysis of target systems.',
  },
  {
    step: '02',
    title: 'Scanning & Enumeration',
    description: 'Detailed system scanning, open port analysis, service identification, and active asset vulnerability mapping.',
  },
  {
    step: '03',
    title: 'Exploitation & Testing',
    description: 'Controlled vulnerability exploitation, privilege escalation, post-exploitation assessment, and security perimeter testing.',
  },
  {
    step: '04',
    title: 'Reporting & Remediation',
    description: 'Comprehensive documentation of findings, proof-of-concept exploits, impact ratings, and direct recovery and remediation guidance.',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'What is a penetration test, and why does my business need one?',
    answer: 'A penetration test is a simulated real-world attack on your computer systems, networks, or applications to identify security vulnerabilities before malicious hackers can exploit them. It helps you understand your actual risk posture, comply with regulatory standards, and verify the effectiveness of your security defenses.',
  },
  {
    question: 'How long does a typical security assessment take?',
    answer: 'The duration depends on the scope and complexity of the systems being tested. A standard web application or external network assessment typically takes 1 to 2 weeks, whereas larger cloud environments or full physical/social-engineering red team exercises can span 3 to 6 weeks.',
  },
  {
    question: 'Do you perform tests in production environments?',
    answer: 'Yes, but I take extreme precautions to ensure zero service disruption. I coordinate closely with your infrastructure teams, schedule high-risk tests during off-peak hours, and utilize controlled non-destructive payloads. When possible, testing on a staging environment is recommended, but production-level testing yields the most accurate risk analysis.',
  },
  {
    question: 'What happens after the assessment is complete?',
    answer: 'I deliver a comprehensive, cryptographic-signed report detailing all findings categorized by severity (Critical, High, Medium, Low). The report includes detailed descriptions, reproducible proof-of-concepts, and step-by-step remediation advice. I also provide a post-remediation review within 60 days to verify that your patches were correctly implemented.',
  },
  {
    question: 'What AI/ML frameworks do you work with?',
    answer: 'I specialize in TensorFlow, PyTorch, HuggingFace Transformers, Scikit-learn, and ONNX Runtime for production ML deployments. I have experience with model optimization (quantization, pruning, distillation), MLOps pipelines, and deploying models at scale using Docker, Kubernetes, and serverless architectures.',
  },
  {
    question: 'How do you approach AI security?',
    answer: 'AI security is a multi-layered discipline covering adversarial robustness (evasion, poisoning, extraction attacks), supply chain security (model provenance, dependency scanning), runtime monitoring (drift detection, outlier detection), and governance (bias auditing, explainability, compliance). I apply defense-in-depth principles adapted for ML systems.',
  },
];

export const SERVICES = [
  'External Penetration Testing',
  'Internal Network Security Auditing',
  'Mobile App Reverse Engineering',
  'Cloud Configuration Auditing',
  'Secure Code Review (SAST/DAST)',
  'Social Engineering & Phishing',
  'IoT/Firmware Security Analysis',
  'Incident Response Planning',
];
