export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface Proficiency {
  name: string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Penetration Testing",
    skills: ["Network Pentesting", "Web App Auditing", "API Security Assessment", "Vulnerability Assessment"]
  },
  {
    title: "Programming Languages",
    skills: ["Python (Scripting & Automation)", "JavaScript / TypeScript", "Bash / PowerShell", "SQL"]
  },
  {
    title: "Security Tools",
    skills: ["Burp Suite", "Nmap", "Wireshark", "Metasploit Framework"]
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS Security", "Docker", "Linux Hardening", "Database Security"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "CEH (Certified Ethical Hacker Master)",
    issuer: "EC-Council",
    year: "2023"
  },
  {
    title: "OSCP (Offensive Security Certified Professional)",
    issuer: "Offensive Security",
    year: "2024"
  },
  {
    title: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    year: "2024"
  }
];

export const PROFICIENCIES: Proficiency[] = [
  { name: "Penetration Testing", percentage: 95 },
  { name: "Security Tools", percentage: 90 },
  { name: "Programming Languages", percentage: 88 },
  { name: "Cryptography & Protocols", percentage: 85 },
  { name: "Cloud & Infrastructure", percentage: 82 },
  { name: "Compliance & Standards", percentage: 87 }
];

export const PROJECTS: Project[] = [
  {
    id: "intrusion-detection",
    title: "Real-Time Network Intrusion Detection System (NIDS)",
    description: "Security assessment & ethical hacker certification project. Real-time network packet capture and analysis system that decodes raw IP/TCP headers to detect port scans, signature anomalies, and cleartext credential transmission across live network interfaces.",
    impact: "Real-Time Detection",
    tags: ["Cybersecurity", "Python", "Network Security", "Packet Analysis"]
  },
  {
    id: "attendance-system",
    title: "Real-Time Face Recognition Attendance",
    description: "A real-time face detection and recognition pipeline that automates student class attendance logging via live webcam feeds and statistical exports.",
    impact: "99.4% Recognition Accuracy",
    tags: ["Computer Vision", "OpenCV", "SQLite", "Python"]
  },
  {
    id: "sentiment-analyzer",
    title: "Campus Feed Sentiment Analyzer",
    description: "An NLP pipeline processing real-time student forum feedback and chat streams via WebSockets to detect negative sentiment spikes and alert campus admins.",
    impact: "<200ms Inference Latency",
    tags: ["NLP", "FastAPI", "WebSockets", "Transformers"]
  },
  {
    id: "aqi-detector",
    title: "IoT Real-Time AQI Predictor & Alert",
    description: "An environmental forecasting system collecting PM2.5/PM10 sensor telemetry to predict air quality trends and dynamically trigger ventilation overrides.",
    impact: "95% Forecasting Correlation",
    tags: ["Machine Learning", "IoT Sensors", "Random Forest", "SMTP"]
  },
  {
    id: "sign-translator",
    title: "Real-Time ASL Hand Sign Translator",
    description: "A deep learning camera stream processor tracing hand landmarks to translate American Sign Language (ASL) gestures into text dynamically.",
    impact: "24 FPS Live Inference Speed",
    tags: ["Deep Learning", "MediaPipe", "LSTM", "TensorFlow"]
  },
  {
    id: "discord-bots",
    title: "Discord Bot Suite",
    description: "A custom Discord bot suite featuring a voice music player and automated moderation and user management tools.",
    impact: "Deployed in 15+ Servers",
    tags: ["Discord API", "Node.js", "WebSockets"]
  },
  {
    id: "freelance-portals",
    title: "Freelance Client Websites",
    description: "Tailored full-stack business web applications built using React.js and Python backend APIs, utilizing custom CSS layout grids and lifetime support.",
    impact: "100% Client Satisfaction",
    tags: ["React.js", "Python", "CSS3", "HTML5"]
  },
  {
    id: "memories-portals",
    title: "3D Surprise & Memory Portals",
    description: "Anniversary surprise websites and digital memory albums designed with modern interactive 3D layout structures, fluid canvas physics, and custom audio layers.",
    impact: "5,000+ Surprise Views",
    tags: ["3D Web Design", "HTML5 Canvas", "CSS3 Animations"]
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Reconnaissance",
    description: "Information gathering, target mapping, open-source intelligence (OSINT), and structural analysis of target systems."
  },
  {
    step: "02",
    title: "Scanning & Enumeration",
    description: "Detailed system scanning, open port analysis, service identification, and active asset vulnerability mapping."
  },
  {
    step: "03",
    title: "Exploitation & Testing",
    description: "Controlled vulnerability exploitation, privilege escalation, post-exploitation assessment, and security perimeter testing."
  },
  {
    step: "04",
    title: "Reporting & Remediation",
    description: "Comprehensive documentation of findings, proof-of-concept exploits, impact ratings, and direct recovery and remediation guidance."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What is a penetration test, and why does my business need one?",
    answer: "A penetration test is a simulated real-world attack on your computer systems, networks, or applications to identify security vulnerabilities before malicious hackers can exploit them. It helps you understand your actual risk posture, comply with regulatory standards, and verify the effectiveness of your security defenses."
  },
  {
    question: "How long does a typical security assessment take?",
    answer: "The duration depends on the scope and complexity of the systems being tested. A standard web application or external network assessment typically takes 1 to 2 weeks, whereas larger cloud environments or full physical/social-engineering red team exercises can span 3 to 6 weeks."
  },
  {
    question: "Do you perform tests in production environments?",
    answer: "Yes, but I take extreme precautions to ensure zero service disruption. I coordinate closely with your infrastructure teams, schedule high-risk tests during off-peak hours, and utilize controlled non-destructive payloads. When possible, testing on a staging environment is recommended, but production-level testing yields the most accurate risk analysis."
  },
  {
    question: "What happens after the assessment is complete?",
    answer: "I deliver a comprehensive, cryptographic-signed report detailing all findings categorized by severity (Critical, High, Medium, Low). The report includes detailed descriptions, reproducible proof-of-concepts, and step-by-step remediation advice. I also provide a post-remediation review within 60 days to verify that your patches were correctly implemented."
  }
];

export const SERVICES = [
  "External Penetration Testing",
  "Internal Network Security Auditing",
  "Mobile App Reverse Engineering",
  "Cloud Configuration Auditing",
  "Secure Code Review (SAST/DAST)",
  "Social Engineering & Phishing",
  "IoT/Firmware Security Analysis",
  "Incident Response Planning"
];
