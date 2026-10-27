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
  image?: string;
  featured?: boolean;
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
  tagline: 'Hi, I\'m Balamurugan C. I specialize in Vibe Coding high-velocity full-stack MVPs, developing robust Machine Learning pipelines, and hardening intelligent cyber infrastructure.',
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
    title: '★ Vibe Coding & Agentic AI Prototyping',
    skills: [
      'Cursor / Claude 3.7 / Copilot Flow',
      'Autonomous Agentic Workflows',
      'Prompt Architecture & System Directives',
      'High-Velocity Full-Stack MVPs',
      'LLM Tool Calling & RAG Pipelines',
      'Instant Code Refactoring & Deployment'
    ],
  },
  {
    title: 'Ethical Hacking & Pentesting',
    skills: ['Network Penetration Testing', 'Web Application Security Auditing', 'API Vulnerability Assessment', 'Ethical Exploitation & Privilege Escalation'],
  },
  {
    title: 'Security Analysis & Testing Tools',
    skills: ['Burp Suite Professional', 'Nmap Network Scanner', 'Wireshark Packet Analyzer', 'Metasploit Framework'],
  },
  {
    title: 'Python, Data Science & AI',
    skills: ['Python (Automation & Security Scripts)', 'Data Preprocessing & EDA (Pandas, NumPy)', 'Machine Learning (Scikit-Learn)', 'Matplotlib & Seaborn Visualizations'],
  },
  {
    title: 'Cloud, Infrastructure & Web',
    skills: ['AWS Cloud Security', 'Docker Containerization', 'Linux System Hardening', 'React & FastAPI Web Applications'],
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
    id: 'intelliq',
    title: 'INTELLIQ — AI & Data Science Association Platform',
    tagline: 'Official University AI Association Web Portal',
    description: 'Official digital platform for the Association of Artificial Intelligence & Data Science at INFO Institute of Engineering. Powers departmental event management, technical symposiums, research showcase archives, executive profiles, and automated attendee registration with PostgreSQL ACID transactional safety and asynchronous FastAPI endpoints.',
    impact: 'Official College Hub • 300+ Members • Live Event Engine',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Vercel'],
    image: '/projects/intelliq.png',
    featured: true,
    details: {
      problem: 'University academic associations frequently struggle with fragmented communication across scattered social channels, manual paper registrations for hackathons/symposiums, and lack of persistent public archives for technical achievements.',
      architecture: 'Modern decoupled full-stack architecture: React SPA frontend on Vercel with Tailwind CSS; high-throughput Python FastAPI backend running in Docker containers; managed PostgreSQL database handling transactional student records, event quotas, and workshop enrollments.',
      frontend: 'React 18 with Tailwind CSS, custom glassmorphism design system, interactive executive roster, event countdown widgets, and dynamic responsive registrations.',
      backend: 'FastAPI asynchronous REST API with Pydantic v2 data validation, SQLAlchemy ORM, and automated schema migration management.',
      database: 'PostgreSQL database with indexed student IDs, foreign key relational integrity, and ACID transactional safeguards.',
      auth: 'JWT-based token authentication for council administrators with role-based access control (RBAC).',
      security: 'CORS origins restricted, parameter sanitization, rate-limiting on registration endpoints, and SSL/TLS termination.',
      caching: 'In-memory caching of public event schedules and static department metadata for sub-50ms TTFB.',
      optimization: 'Vite build optimization with code splitting, image asset compression, and lazy route loading.',
      deployment: 'Vercel frontend deployment with CI/CD and containerized FastAPI on cloud infrastructure.',
      monitoring: 'Application health probes, structured logging, and real-time error tracking.',
      cicd: 'Automated GitHub Actions workflow running linting, build checks, and staging preview deployments.',
      scalability: 'Stateless API workers designed to handle concurrency bursts during live campus symposium registrations.',
      future: 'Interactive alumni networking network, paper submission review workflows, and automated certificate generation.'
    },
    links: {
      github: 'https://github.com/Balamurugan0113/INTELLIQ',
      demo: 'https://intelliq-tan.vercel.app'
    }
  },
  {
    id: 'gen-ai-bot',
    title: 'Multi-Modal Gen AI Customer Assistant Suite',
    tagline: 'Multi-Modal LLM Agent with LangChain & Google PaLM',
    description: 'Enterprise-grade multi-modal generative AI assistant suite built with LangChain, Google PaLM, and Streamlit. Implements semantic vector retrieval on customer service knowledge bases, domain-specific scientific literature search via arXiv integration, clinical entity recognition, and sentiment-aware conversational steering.',
    impact: 'Multi-Domain Intelligence • <350ms Query Latency • Multi-Modal & Multi-Lingual',
    tags: ['Generative AI', 'LangChain', 'Google PaLM', 'Streamlit', 'NLP', 'Vector Embeddings'],
    image: '/projects/gen-ai.svg',
    featured: true,
    details: {
      problem: 'Generic customer service chatbots fail when confronted with multi-modal inputs, technical academic research queries, or subtle domain-specific clinical nuances requiring specialized contextual awareness.',
      architecture: 'Modular retrieval-augmented generation (RAG) pipeline: user prompt → query embedding generation → FAISS vector search → LangChain multi-prompt router → Google PaLM / Gemini LLM → contextual response synthesis with citation grounding.',
      frontend: 'Streamlit reactive dashboard with multi-modal file uploads (audio, image, document), real-time message streaming, and debug entity inspectors.',
      backend: 'Python with LangChain, HuggingFace transformers, Google Generative AI SDK, and arXiv API connector.',
      database: 'FAISS vector database for dense semantic embeddings paired with tabular FAQ knowledge stores.',
      auth: 'API token gate for enterprise domain access.',
      security: 'Prompt injection sanitization, PII masking, temperature bounds enforcement, and hallucination guardrails.',
      caching: 'Vector cache for frequently asked queries to reduce LLM API latency and token cost.',
      optimization: 'Chunking optimization with recursive character splitters and embedding dimension reduction.',
      deployment: 'Containerized Python environment with environment variable key management.',
      monitoring: 'Latency logging, token consumption analytics, and confidence score distribution.',
      cicd: 'Automated test suite verifying retrieval accuracy and prompt template validation.',
      scalability: 'Horizontally scalable microservice architecture with asynchronous embedding workers.',
      future: 'Integration of local Ollama / Llama 3 models for private air-gapped enterprise deployments.'
    },
    links: {
      github: 'https://github.com/Balamurugan0113/gen-ai-customer-service-bot',
      demo: 'https://github.com/Balamurugan0113/gen-ai-customer-service-bot#readme'
    }
  },
  {
    id: 'vibely',
    title: 'Vibely WebApp — Real-Time Cloud Music Streaming',
    tagline: 'Modern Full-Stack Audio Streaming & Queue Engine',
    description: 'Progressive cloud audio streaming web application featuring a Spotify-inspired glassmorphic dark theme, persistent audio player context, seamless track progression, dynamic queue manipulation, and cloud asset storage powered by Supabase PostgreSQL.',
    impact: 'Zero-Latency Audio Stream • Dynamic Queue • Realtime Cloud DB',
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Web Audio API', 'Glassmorphism'],
    image: '/projects/vibely.svg',
    featured: true,
    details: {
      problem: 'Web-based media players frequently experience audio interruption during route transitions, high memory leaks from improper buffer management, and sluggish playlist synchronizations across devices.',
      architecture: 'Single-page React application powered by Vite, leveraging React Context API for non-blocking global playback state, paired with Supabase PostgreSQL and cloud bucket storage for audio streams and album art.',
      frontend: 'Vite React application featuring custom glassmorphism design, floating audio control dock, volume sliders, track scrubbing, and dynamic playlist queue.',
      backend: 'Supabase BaaS with real-time PostgreSQL subscriptions, edge functions, and signed audio stream CDN endpoints.',
      database: 'Supabase PostgreSQL database storing songs, artists, albums, durations, and user favorites with relational indexes.',
      auth: 'Supabase Auth with email magic link and OAuth integrations.',
      security: 'Row Level Security (RLS) policies on song catalogs and user playlists, signed CDN URLs for copyright protection.',
      caching: 'Browser audio chunk buffering and IndexedDB metadata caching for instant playback resume.',
      optimization: 'Audio pre-fetching for next queue item, WebP album cover optimization, and zero unnecessary re-renders in audio contexts.',
      deployment: 'Vercel continuous deployment with edge caching for global audio asset delivery.',
      monitoring: 'Web vitals telemetry, playback error event captures, and Supabase database query analytics.',
      cicd: 'Automated GitHub Actions deployment pipeline triggered on main branch push.',
      scalability: 'Stateless edge architecture capable of serving audio streams to concurrent listeners globally.',
      future: 'Synchronized collaborative listening rooms via WebRTC and personalized AI playlist recommendations.'
    },
    links: {
      github: 'https://github.com/Balamurugan0113/Vibely-webapp',
      demo: 'https://github.com/Balamurugan0113/Vibely-webapp#readme'
    }
  },
  {
    id: 'kanchipuram-bot',
    title: 'Kanchipuram Bot — FiveM Business & Economy Automation',
    tagline: 'Discord Economy & Real-Time Google Sheets Logger',
    description: 'Autonomous Discord bot developed for FiveM roleplay gaming servers to streamline high-volume business operations including resource grinding, item crafting, dynamic player sales, and warehouse inventory management with bi-directional Google Sheets syncing and screenshot receipt validation.',
    impact: '100% Automated Logging • Multi-Category Inventory • Screenshot Proof Verification',
    tags: ['Python', 'Discord.py', 'Google Sheets API', 'Docker', 'SQLite', 'Automation'],
    image: '/projects/kanchipuram.svg',
    featured: true,
    details: {
      problem: 'Large multiplayer gaming servers (FiveM) handle thousands of in-game financial transactions and warehouse resource shifts daily; manual bookkeeping leads to human error, theft, and administrative bottleneck.',
      architecture: 'Event-driven Discord.py bot daemon interacting with Discord Gateway API, validating user attachments/receipts, writing real-time state to SQLite, and synchronizing aggregated reports to Google Sheets via Google Service Account APIs.',
      frontend: 'Interactive Discord UI with rich embeds, dynamic dropdown selectors, modal forms, and real-time button approvals.',
      backend: 'Python 3.11 with Discord.py, gspread, oauth2client, and async background task scheduling.',
      database: 'SQLite3 local transaction cache coupled with Google Sheets spreadsheet cloud storage as an accessible administrative ledger.',
      auth: 'Role-based Discord permissions (Management, Lead Crafter, Worker) verified on every slash command invocation.',
      security: 'Service account credentials isolated in encrypted environment variables, sanitized user inputs to prevent injection attacks.',
      caching: 'In-memory item price matrix and member registry to prevent Google Sheets API rate-limit exhaustion (quota management).',
      optimization: 'Batched cell updates and background asynchronous write queues to guarantee sub-second Discord command responses.',
      deployment: 'Containerized with Docker and docker-compose for 24/7 uptime with auto-restart policies.',
      monitoring: 'Automated audit logs channel posting all transactions with user timestamps and receipt attachments.',
      cicd: 'Git-based workflow with automated container build and restart scripts.',
      scalability: 'Designed to handle multi-guild sharding and thousands of simultaneous resource transactions.',
      future: 'Direct FiveM MySQL database live bridge and OCR auto-extraction of transaction screenshot values.'
    },
    links: {
      github: 'https://github.com/Balamurugan0113/Kanchipuram-bot',
      demo: 'https://github.com/Balamurugan0113/Kanchipuram-bot#readme'
    }
  },
  {
    id: 'cardio-ml',
    title: 'Cardiovascular Risk & Heart Disease ML Classifier',
    tagline: 'Healthcare Predictive Analytics & Diagnostic ML Pipeline',
    description: 'Predictive machine learning classification model developed under the Tamil Nadu Government Naan Mudhalvan initiative. Analyzes patient biometric indicators (cholesterol, resting ECG, blood pressure, max heart rate) to predict cardiac risk with multi-algorithm benchmarking and exploratory statistical validation.',
    impact: 'Early Risk Detection • High Clinical Precision • Cross-Validated ROC-AUC',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Pandas', 'Healthcare AI'],
    image: '/projects/cardio-ml.svg',
    featured: true,
    details: {
      problem: 'Cardiovascular diseases are the leading cause of global mortality. Early, non-invasive risk detection using clinical health metrics can substantially improve patient prognosis and optimize preventive healthcare.',
      architecture: 'Full machine learning pipeline: Clinical dataset ingestion → statistical exploratory data analysis (EDA) → outlier removal and imputation → feature scaling (StandardScaler) → multi-model training (Random Forest, Logistic Regression, SVM) → hyperparameter tuning via GridSearchCV → ROC-AUC evaluation.',
      frontend: 'Jupyter and Google Colab interactive analytics notebook with Matplotlib/Seaborn correlation heatmaps and confusion matrices.',
      backend: 'Python with Scikit-learn, Pandas, NumPy, and SciPy statistical libraries.',
      database: 'Structured patient clinical dataset (heart.csv) with validated diagnostic indicators.',
      auth: 'Not applicable (Standalone statistical ML pipeline).',
      security: 'Anonymized biometric patient records conforming to healthcare data privacy standards.',
      caching: 'Serialized trained model weights (.joblib / .pkl) for instant inference without model retraining.',
      optimization: 'Feature importance ranking using Random Forest Gini impurity to select highest-yield clinical predictors.',
      deployment: 'Exportable inference pipeline compatible with FastAPI / Flask clinical microservices.',
      monitoring: 'Precision, recall, F1-score, and ROC curve sensitivity analysis across demographic subsets.',
      cicd: 'Reproducible notebook execution and unit tests validating input tensor dimensions.',
      scalability: 'Lightweight inference architecture capable of processing thousands of patient records per minute.',
      future: 'Integration of deep learning neural networks and real-time wearable ECG sensor stream processing.'
    },
    links: {
      github: 'https://github.com/Balamurugan0113/NaanMudhalvan',
      demo: 'https://github.com/Balamurugan0113/NaanMudhalvan#readme'
    }
  },
  {
    id: 'intrusion-detection',
    title: 'Real-Time Network Intrusion Detection System',
    tagline: 'Security assessment & ethical hacker certification project',
    description: 'Security assessment & ethical hacker certification project. Real-time network packet capture and analysis system that decodes raw IP/TCP headers to detect port scans, signature anomalies, and cleartext credential transmission across live network interfaces.',
    impact: 'Real-Time Line Rate Detection',
    tags: ['Cybersecurity', 'Python', 'Network Security', 'Packet Analysis'],
    image: '/projects/nids.svg',
    details: {
      problem: 'Enterprise networks face sophisticated cyber threats requiring real-time detection at line rate without proprietary lock-in or high latency overhead.',
      architecture: 'Multi-threaded pipeline architecture with zero-copy buffer management. Packet capture threads bind to raw sockets using AF_PACKET, feeding a lock-free ring buffer parsed by parallel signature and anomaly heuristic analyzers.',
      frontend: 'Web-based tactical dashboard with real-time traffic visualization, live packet flow charts, and alert timelines.',
      backend: 'Python with asyncio and ctypes-based binary protocol decoding supporting Snort-compatible rules.',
      database: 'TimescaleDB for time-series flow statistics and PostgreSQL for rule set configurations.',
      auth: 'JWT-based API authentication with role-based access control.',
      security: 'Principle of least privilege, memory bounds enforcement, and sandboxed signature execution.',
      caching: 'Redis session state cache for connection tracking and Bloom filters for IP blacklist lookups.',
      optimization: 'Zero-copy buffer management reducing memory allocation overhead by 95%.',
      deployment: 'Docker container with Alpine base and Kubernetes deployment manifests.',
      monitoring: 'Prometheus metrics endpoint exposing packet throughput and rule match rates.',
      cicd: 'Automated GitHub Actions linting, unit tests, and integration tests against simulated network traffic.',
      scalability: 'Horizontal scaling via packet sharding by source IP hash.',
      future: 'MITRE ATT&CK framework mapping and eBPF/XDP kernel-bypass packet processing.'
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' }
  },
  {
    id: 'attendance-system',
    title: 'Real-Time Face Recognition Attendance',
    tagline: 'Real-time face detection and recognition pipeline',
    description: 'A real-time face detection and recognition pipeline that automates student class attendance logging via live webcam feeds, composite duplicate checks, and statistical exports.',
    impact: '99.4% Recognition Accuracy',
    tags: ['Computer Vision', 'OpenCV', 'SQLite', 'Python', 'Face Recognition'],
    image: '/projects/attendance.svg',
    details: {
      problem: 'Traditional attendance systems suffer from proxy attendance and slow manual processing during peak university entry windows.',
      architecture: 'Two-stage detection pipeline: Stage 1 Haar Cascade classifiers for rapid ROI localization; Stage 2 extracts 128D face embeddings using dlib ResNet model with Euclidean distance matching.',
      frontend: 'Streamlit real-time dashboard with live camera feed overlay, detection boxes, and attendance heatmaps.',
      backend: 'Python FastAPI with async stream processing and background report generation scheduler.',
      database: 'SQLite3 with normalized schema and composite UNIQUE(student_id, date) constraints.',
      auth: 'Role-based access: admin, faculty, and operator accounts with JWT token auth.',
      security: 'Biometric embeddings stored as salted numeric hashes; raw face images purged after extraction.',
      caching: 'In-memory LRU cache of recent embeddings for sub-100ms verification.',
      optimization: 'Frame downscaling to 160x120 for detection reducing CPU usage by 75%.',
      deployment: 'Docker multi-stage container supporting CPU-only edge device deployment.',
      monitoring: 'Recognition throughput and false positive rate tracking.',
      cicd: 'GitHub Actions unit tests and mock camera stream regression tests.',
      scalability: 'Camera-to-server sharding supporting 50+ concurrent classroom video feeds.',
      future: 'Liveness anti-spoofing detection and automated learning management system (LMS) syncing.'
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' }
  },
  {
    id: 'digit-recognition',
    title: 'Handwritten Digit Recognition System',
    tagline: 'Deep Learning Convolutional Neural Network',
    description: 'Engineered a Convolutional Neural Network (CNN) trained on the MNIST dataset to classify handwritten digits with high precision (>97% accuracy) featuring OpenCV visual normalization pipelines.',
    impact: '>97% Recognition Accuracy',
    tags: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib', 'OpenCV'],
    image: '/projects/digit-cnn.svg',
    details: {
      problem: 'Automated postal and form sorting requires rapid, high-accuracy classification of handwritten digits from noisy visual inputs.',
      architecture: 'Deep Learning CNN architecture with Conv2D + MaxPooling + Dropout (0.25) + Dense Softmax classification head.',
      frontend: 'Interactive Python visual inspector for live test image drawing and confidence score display.',
      backend: 'TensorFlow/Keras inference engine with NumPy vectorization.',
      database: 'MNIST benchmark dataset with checkpointed model weights.',
      auth: 'Not applicable (Local ML pipeline).',
      security: 'Input image shape and range sanitization preventing tensor injection errors.',
      caching: 'In-memory loaded model weights for sub-10ms single image classification.',
      optimization: 'Convolutional kernel tuning and Adam optimizer for rapid convergence.',
      deployment: 'Exported model file (.h5 / .onnx) ready for embedded or web deployment.',
      monitoring: 'Confusion matrix analysis and per-digit precision/recall evaluation.',
      cicd: 'Automated unit tests verifying tensor shapes and classification outputs.',
      scalability: 'Batch inference pipeline for bulk document processing.',
      future: 'Extension to full alphanumeric character recognition (EMNIST dataset).'
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' }
  },
  {
    id: 'aqi-detector',
    title: 'IoT Real-Time AQI Predictor & Alert',
    tagline: 'IoT sensor telemetry air quality forecasting',
    description: 'An environmental forecasting system collecting PM2.5/PM10 sensor telemetry over MQTT to predict air quality trends using Random Forest models and dynamically trigger ventilation overrides.',
    impact: '95% Forecasting Correlation',
    tags: ['Machine Learning', 'IoT', 'Random Forest', 'MQTT', 'SMTP'],
    image: '/projects/aqi-iot.svg',
    details: {
      problem: 'Indoor air quality directly impacts student health, cognitive performance, and institutional safety, yet most facilities lack real-time predictive monitoring.',
      architecture: 'IoT sensor nodes (ESP32) publish telemetry via MQTT; ingestion service writes to InfluxDB; Scikit-learn Random Forest model forecasts multi-step 24-hour AQI trends.',
      frontend: 'Grafana dashboards for real-time AQI visualization across campus locations.',
      backend: 'Python with asyncio MQTT client, FastAPI REST layer, and automated retraining pipelines.',
      database: 'InfluxDB for time-series sensor data and PostgreSQL for calibration thresholds.',
      auth: 'API keys for sensor authentication and MQTT TLS client certificates.',
      security: 'TLS 1.3 encryption, isolated IoT VLAN, and sensor firmware signing.',
      caching: 'Last-known sensor values cached in Redis for instantaneous dashboard loading.',
      optimization: 'Pandas vectorized feature engineering reducing compute time on edge gateways.',
      deployment: 'Docker Compose and Raspberry Pi edge gateway deployment.',
      monitoring: 'Sensor health monitoring with stale data detection and automated email alerts.',
      cicd: 'GitHub Actions validation for model training pipelines and container builds.',
      scalability: 'MQTT topic partitioning by building zone for horizontal gateway scaling.',
      future: 'Integration with Building Management Systems (BACnet/Modbus) for automated HVAC control.'
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' }
  },
  {
    id: 'sentiment-analyzer',
    title: 'Campus Feed Sentiment Analyzer',
    tagline: 'Real-time NLP student forum sentiment analysis',
    description: 'An NLP pipeline processing real-time student forum feedback and chat streams via WebSockets to detect negative sentiment spikes and alert campus administrators.',
    impact: '<200ms Inference Latency',
    tags: ['NLP', 'FastAPI', 'WebSockets', 'Transformers', 'DistilBERT'],
    image: '/projects/sentiment-nlp.svg',
    details: {
      problem: 'Institutions need to monitor student sentiment across communication channels to proactively address distress or dissatisfaction at scale.',
      architecture: 'Event-driven microservice architecture: WebSocket gateway → preprocessing → DistilBERT ONNX runtime inference → sliding-window metric aggregation → alert dispatcher.',
      frontend: 'React dashboard with real-time sentiment trend charts, top phrases, and alert timelines.',
      backend: 'FastAPI with async WebSockets handling 1,000+ concurrent client connections.',
      database: 'InfluxDB for time-series sentiment metrics and PostgreSQL for message logs.',
      auth: 'JWT with WebSocket token validation on connect.',
      security: 'Input sanitization, rate limiting (100 msg/min), and PII redaction before storage.',
      caching: 'Redis Streams message buffering and hash-based inference result caching.',
      optimization: 'ONNX Runtime with INT8 quantization reducing inference time by 3x.',
      deployment: 'Docker Compose with Nginx reverse proxy and SSL termination.',
      monitoring: 'Prometheus metrics and Grafana dashboards tracking sentiment distribution.',
      cicd: 'GitHub Actions model evaluation, quantization, and container deployment.',
      scalability: 'Horizontal scaling via message partitioning by student cohort.',
      future: 'Multi-lingual emotion detection (Tamil, Hindi, English) and topic modeling.'
    },
    links: { github: 'https://github.com/Balamurugan0113', demo: '#' }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'elevance-internship',
    role: 'Data Science / AI / ML / Python Intern',
    organization: 'Elevance Skills Technology Private Limited',
    period: '2024 - Present',
    description: 'Working on real-world AI and Data Science projects, focusing on machine learning models and Python-based data pipelines.',
    achievements: [
      'Engineered and optimized data pipelines using Python for robust machine learning applications.',
      'Developed and deployed predictive ML models for diverse data-driven use cases.',
      'Collaborated on AI infrastructure improvements and model fine-tuning.',
    ],
    type: 'internship',
  },
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
