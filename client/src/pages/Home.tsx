import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  SKILL_CATEGORIES, 
  CERTIFICATIONS, 
  PROFICIENCIES, 
  PROJECTS, 
  METHODOLOGY_STEPS, 
  FAQS, 
  SERVICES 
} from "@shared/const";
import { PROJECT_FILES } from "@shared/projectFiles";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Loader2, 
  ShieldCheck, 
  Award, 
  Code2, 
  GraduationCap, 
  Target, 
  Info,
  ChevronDown,
  X,
  Send,
  ExternalLink,
  Folder,
  FileCode,
  Copy,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Database,
  FileText
} from "lucide-react";
import balamuruganImg from "@/assets/balamurugan.png";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters.")
});

type ContactForm = z.infer<typeof contactSchema>;

// Detailed mapping for projects
const projectDetailsMap: Record<string, { summary: string; auditLogs: string[]; techUsed: string[] }> = {
  "intrusion-detection": {
    summary: "Real-time Network Intrusion Detection System (NIDS) for cybersecurity assessments and ethical hacking certification. Binds raw sockets to live network interfaces, parses IPv4/TCP header byte arrays, and matches traffic against blocklisted IPs and signature rules. Detects port scans, unauthorized connections, and cleartext credential transmission in real-time.",
    techUsed: ["Python", "Raw Sockets", "Packet Parsing", "struct Decoding", "Signature Rules", "JSON Config"],
    auditLogs: [
      "Configured raw IP socket descriptors binding to network interfaces for live packet interception.",
      "Implemented binary struct unpacking filters decoding IPv4 and TCP header offsets and protocol identification.",
      "Built dynamic signature mapping modules flagging restricted ports (21, 23, 139, 445, 3389) and blocked IP zones.",
      "Integrated heuristic packet analysis identifying unencrypted USER/PASS credentials and suspicious payload strings.",
      "Developed graceful fallback simulation mode automatically triggering when admin privileges are unavailable.",
      "Deployed real-time alert logging with timestamp tracking for security incident response workflows."
    ]
  },
  "attendance-system": {
    summary: "Comprehensive real-time class attendance logger built around OpenCV and Face Recognition algorithms. Optimizes frame sizes and uses Haar Cascade pre-scanning to ensure stable real-time edge processing.",
    techUsed: ["Python", "OpenCV", "SQLite3", "face_recognition API", "Streamlit UI"],
    auditLogs: [
      "Initialized database constraints and mapped relational student registration tables.",
      "Loaded 128D facial boundary encodings from SQLite records into memory cache.",
      "Downsampled video streams to 0.25x scaling for rapid real-time CPU face localization.",
      "Implemented duplicate-prevention logs ensuring each student registers check-ins once daily."
    ]
  },
  "sentiment-analyzer": {
    summary: "WebSocket-driven Natural Language Processing dashboard designed to ingest live text feedback from student forums, classifying tone using sentiment transformers.",
    techUsed: ["FastAPI", "WebSockets", "HuggingFace Transformers", "DistilBERT", "Torch"],
    auditLogs: [
      "Created FastAPI client listener subscribing to live student forum stream pools.",
      "Integrated pretrained SST-2 DistilBERT classifier mapping text strings to polarity scores.",
      "Designed connection pool managers pushing dynamic metrics to active browser nodes.",
      "Configured alerts triggering facilities callbacks when negative confidence surges above 85%."
    ]
  },
  "aqi-detector": {
    summary: "Campus weather monitoring pipeline streaming telemetry from air sensor arrays and forecasting tomorrow's AQI averages using random forest regression.",
    techUsed: ["Random Forest Regressor", "MQTT (paho-mqtt)", "Scikit-Learn", "Python smtplib"],
    auditLogs: [
      "Connected MQTT broker endpoints, subscribing to room sensor arrays.",
      "Constructed Scikit-Learn training pipelines tracking PM2.5, PM10, temperature and humidity.",
      "Built robust regression forecaster with 95% forecasting correlation rate.",
      "Integrated SMTP notification scripts triggering ventilation system warnings."
    ]
  },
  "sign-translator": {
    summary: "Deep learning ASL gesture-to-text translator leveraging hand landmarker coordinate arrays processed through an LSTM network to translate video streams in real-time.",
    techUsed: ["TensorFlow", "MediaPipe Hands", "LSTM Recurrent Networks", "Numpy", "Keras API"],
    auditLogs: [
      "Configured MediaPipe Landmarkers mapping 21 spatial points on hand models in 3D space.",
      "Constructed sequential LSTM layers in Keras reading temporal gesture frames.",
      "Preloaded pretrained ASL gesture weights to perform real-time predictions at 24 FPS.",
      "Rendered bounding indicators overlaying recognized gestural text on frame streams."
    ]
  },
  "discord-bots": {
    summary: "A customized Discord bot suite implementing real-time audio streams via Voice Channels and administrative commands filtering channel triggers.",
    techUsed: ["discord.js API", "Node.js", "@discordjs/voice", "ytdl-core", "libsodium"],
    auditLogs: [
      "Registered Gateway Intents enabling Message Content and Voice State monitoring.",
      "Constructed audio processing players drawing real-time streams from YouTube URLs.",
      "Built moderation logs and Kick/Ban commands with guild permissions validation.",
      "Implemented welcome card embeds greeting new members joining server pools."
    ]
  },
  "freelance-portals": {
    summary: "Professional freelance web design and development. Delivers responsive, high-performance web systems using React.js for client interfaces and Python for data automation pipelines and server-side logic.",
    techUsed: ["React.js", "Python", "CSS3", "HTML5", "Responsive Grids", "Client Hosting"],
    auditLogs: [
      "Designed reusable component hierarchies in React.js to facilitate scalable frontend expansion.",
      "Integrated Python REST APIs for secure data management, analytics logging, and communication alerts.",
      "Built robust layouts utilizing modern CSS grids and flexbox to guarantee perfect cross-device scaling.",
      "Delivered sites to clients with permanent setups and zero-maintenance hosting solutions."
    ]
  },
  "memories-portals": {
    summary: "Custom gift and surprise landing portals built for close family and friends. Incorporates modern 3D visual layouts, keyframed CSS transitions, HTML5 canvas simulations, and background playlists.",
    techUsed: ["React.js", "3D Interactive Design", "HTML5 Canvas", "CSS3 Animations", "Web Audio API"],
    auditLogs: [
      "Implemented fluid 3D spatial card rotations and hover effects using pure CSS transitions.",
      "Constructed Canvas-based interactive environments rendering floating particles and collision boundaries.",
      "Integrated the Web Audio API to handle sound tracks while respecting browser autoplay security policies.",
      "Deployed personalized galleries and wish timelines to provide immersive surprise interactions."
    ]
  }
};

export default function Home() {
  const [location] = useLocation();
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"report" | "code">("report");
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleOpenProject = (proj: typeof PROJECTS[0]) => {
    setSelectedProject(proj);
    setActiveTab("report");
    setActiveFileIndex(0);
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    toast.success("Code copied to clipboard!");
  };

  // Auto-scroll when loading on a direct subpage path (e.g. /about)
  useEffect(() => {
    if (location && location !== "/") {
      const id = location.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 150);
      }
    }
  }, [location]);

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", message: "" }
  });

  const onFormSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Server transmission error");
      }

      toast.success("Message sent successfully! I will get back to you shortly.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Transmission failed. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAge = (birthDateString: string) => {
    const today = new Date("2026-05-28");
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const age = getAge("2005-09-08");

  // Achievements
  const achievements = [
    { value: `${age} Yrs`, label: "Age", icon: <Info className="h-5 w-5 text-primary" /> },
    { value: "4th Year (Final Year)", label: "B.Tech Student", icon: <GraduationCap className="h-5 w-5 text-primary" /> },
    { value: "5+", label: "AI Models Developed", icon: <Code2 className="h-5 w-5 text-primary" /> },
    { value: "20+", label: "Security Lab Audits", icon: <ShieldCheck className="h-5 w-5 text-primary" /> }
  ];

  // Core values
  const values = [
    {
      title: "Integrity",
      description: "Rigid ethical standards guiding all assessments, ensuring absolute data custody and model safety."
    },
    {
      title: "Excellence",
      description: "Rigorous standards of execution, pushing technical analysis beyond automated scans into deep manual audits."
    },
    {
      title: "Innovation",
      description: "Continuous tracking of AI advancements, developing custom models and secure algorithms to prevent adversarial leakage."
    },
    {
      title: "Transparency",
      description: "Unambiguous reporting, explaining complex logic and data patterns clearly to stakeholders and engineering teams."
    }
  ];

  // Profile Highlights
  const highlights = [
    "Advanced background in Artificial Intelligence, Machine Learning, and Data Science.",
    "Model robustness testing and adversarial machine learning research.",
    "Statistical data analysis, data mining, and predictive modeling.",
    "Comprehensive technical documentation with developer-level implementation guides.",
    "100% manual validation on all data pipelines and machine learning parameters."
  ];

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground gradient-bg">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="relative z-10 mx-auto max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brief introduction */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>AVAILABLE FOR OPPORTUNITIES</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                AI & Data Science <br />
                <span className="gradient-indigo-sky font-extrabold">Engineer</span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Hi, I'm Balamurugan C. I specialize in developing robust Machine Learning pipelines, performing rigorous statistical data analytics, and hardening modern intelligent infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                <Button size="lg" variant="default" onClick={() => handleScrollToSection("projects")} className="w-full sm:w-auto">
                  View Projects
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleScrollToSection("contact")} className="w-full sm:w-auto">
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Right Column: Clean portrait image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl border border-border bg-card shadow-xl overflow-hidden group">
                <img 
                  src={balamuruganImg} 
                  alt="Balamurugan C" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
                <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md border border-border p-3.5 rounded-xl text-center">
                  <div className="font-semibold text-sm text-white">Balamurugan C</div>
                  <div className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase mt-0.5">B.Tech Student, IIE</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              About Me
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
              A dedicated academic and research journey in Artificial Intelligence, Machine Learning, and systems security.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Biography & Timeline */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">My Journey</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  4th year B.Tech student in AI & Data Science with a passion for building secure machine learning systems and conducting security audits. I focus on defensive security research and engineering resilient data-driven applications.
                </p>
              </div>

              {/* Stats/Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((item, idx) => (
                  <Card key={idx} hoverEffect={false} className="flex flex-col justify-between p-4 bg-card/40 border border-border/60">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                        {item.icon}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
                    </div>
                    <div className="text-xl font-bold text-white mt-3">{item.value}</div>
                  </Card>
                ))}
              </div>

              {/* Education Timeline */}
              <div className="space-y-5 pt-2">
                <h3 className="text-lg font-bold text-white">Education</h3>
                <div className="relative pl-6 border-l border-border space-y-6">
                  {/* College */}
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                    <div>
                      <span className="text-xs font-semibold text-primary">2023 - PRESENT</span>
                      <h4 className="text-sm font-bold text-white mt-1">B.Tech in AI & Data Science (Final year)</h4>
                      <p className="text-xs text-muted-foreground font-medium">Info Institute of Engineering</p>
                      <p className="text-xs text-muted-foreground font-medium">Kovilpalayam, Coimbatore </p>
                    </div>
                  </div>

                  {/* Secondary Schooling */}
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 h-4 w-4 rounded-full bg-border border-4 border-background" />
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground">2021 - 2023</span>
                      <h4 className="text-sm font-bold text-white mt-1">Secondary Schooling (11th - 12th)</h4>
                      <p className="text-xs text-muted-foreground font-medium">Shri Nehru Vidyalaya Matriculation Higher Secondary School </p>
                      <p className="text-xs text-muted-foreground font-medium">R.S. PURAM, Coimbatore </p>
                    </div>
                  </div>

                  {/* Primary Schooling */}
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1 h-4 w-4 rounded-full bg-border border-4 border-background" />
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground">2011 - 2021</span>
                      <h4 className="text-sm font-bold text-white mt-1">Primary Schooling</h4>
                      <p className="text-xs text-muted-foreground font-medium">Amrita Vidyalayam </p>
                      <p className="text-xs text-muted-foreground font-medium">Nallampalayam, Coimbatore </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mission/Vision & Highlights */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Mission & Vision */}
              <div className="space-y-3">
                <Card hoverEffect={false} className="p-4 bg-card/60 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <h4 className="text-[11px] font-bold text-white uppercase">Mission</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Build secure, data-driven ML systems with defensive certainty through rigorous security audits.
                  </p>
                </Card>

                <Card hoverEffect={false} className="p-4 bg-card/60 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    <h4 className="text-[11px] font-bold text-white uppercase">Vision</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Establish safe intelligent networks and help organizations navigate AI security threats with confidence.
                  </p>
                </Card>
              </div>

              {/* Highlights List */}
              <Card hoverEffect={false} className="p-4 bg-card/30 border border-border/80">
                <h4 className="text-[10px] font-bold text-white uppercase mb-2.5 tracking-wider">Highlights</h4>
                <ul className="space-y-1.5">
                  {highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-[10px] text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Competitions */}
              <Card hoverEffect={false} className="p-4 bg-card/30 border border-border/80">
                <h4 className="text-[10px] font-bold text-white uppercase mb-2.5 tracking-wider">Competitions</h4>
                <div className="space-y-2">
                  <div className="text-[10px]">
                    <a href="https://www.sih.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Smart India Hackathon 2025</a>
                    <p className="text-muted-foreground text-[9px]">National level hackathon competition</p>
                  </div>
                  <div className="text-[10px]">
                    <a href="https://trisquadathon.infomeister.co.in/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Trisquadathon 2024</a>
                    <p className="text-muted-foreground text-[9px]">CSE Association technical event</p>
                  </div>
                </div>
              </Card>

              {/* Beyond Coding */}
              <Card hoverEffect={false} className="p-4 bg-card/30 border border-border/80">
                <h4 className="text-[10px] font-bold text-white uppercase mb-2.5 tracking-wider">Beyond Coding</h4>
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">🤾</span>
                    <div>
                      <p className="text-white font-semibold">Handball Player</p>
                      <p className="text-muted-foreground text-[9px]">Since school days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-secondary font-bold shrink-0">🎮</span>
                    <div>
                      <p className="text-white font-semibold">PC Gaming</p>
                      <p className="text-muted-foreground text-[9px]">Valorant, GTA 5, Strategy games</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">📱</span>
                    <div>
                      <p className="text-white font-semibold">Mobile Gaming</p>
                      <p className="text-muted-foreground text-[9px]">Casual & competitive gaming</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground font-bold shrink-0">💼</span>
                    <div>
                      <p className="text-white font-semibold">Freelancer</p>
                      <p className="text-muted-foreground text-[9px]">Web and security project delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold shrink-0">🎓</span>
                    <div>
                      <p className="text-white font-semibold">Final Year Projects</p>
                      <p className="text-muted-foreground text-[9px]">Supporting college students with capstone and final year project work</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Connect / Social Links */}
              <Card hoverEffect={false} className="p-4 bg-card/30 border border-border/80">
                <h4 className="text-[10px] font-bold text-white uppercase mb-2.5 tracking-wider">Connect</h4>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <a href="https://github.com/Balamurugan0113" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted hover:bg-primary/10 transition-all">
                    <Github className="h-4 w-4 text-primary" />
                    <span className="text-[11px] text-white">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/balamurugan-c-5507b82a3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted hover:bg-secondary/10 transition-all">
                    <Linkedin className="h-4 w-4 text-secondary" />
                    <span className="text-[11px] text-white">LinkedIn</span>
                  </a>
                  <a href="https://www.youtube.com/@Balsplayzz2005" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted hover:bg-accent/10 transition-all">
                    <Youtube className="h-4 w-4 text-accent" />
                    <span className="text-[11px] text-white">YouTube</span>
                  </a>
                  <a href="https://www.instagram.com/balaa.xx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted hover:bg-pink-600/10 transition-all">
                    <Instagram className="h-4 w-4 text-pink-500" />
                    <span className="text-[11px] text-white">Instagram</span>
                  </a>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Skills & Certifications
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
              Core technical expertise and professional credentials.
            </p>
          </div>

          {/* Skill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <Card key={idx} hoverEffect={true} className="p-5 bg-card border border-border/80 flex flex-col h-full hover:border-primary/50 transition-all">
                <h3 className="text-sm font-bold text-white mb-3 border-b-2 border-primary/40 pb-2.5 uppercase tracking-wider text-primary hover:text-secondary transition-colors">
                  {cat.title}
                </h3>
                <ul className="space-y-2.5 flex-grow">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-white transition-colors group cursor-default">
                      <span className="h-1.5 w-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                      <span className="group-hover:font-semibold transition-all">{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Certifications */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-white">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border-2 border-primary/40 bg-card/50 hover:border-primary/70 hover:bg-card/70 transition-all hover:shadow-lg hover:shadow-primary/20">
                    <div className="p-2 bg-primary/20 rounded text-primary">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-primary leading-snug">{cert.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase font-semibold">{cert.issuer}</p>
                      <span className="inline-block px-2.5 py-1 rounded text-[9px] font-semibold bg-primary/15 text-primary border border-primary/30 mt-1.5">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proficiencies */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-bold text-white">Proficiency</h3>
              <div className="p-5 rounded-lg border border-border bg-card/40 space-y-4">
                {PROFICIENCIES.slice(0, 4).map((prof, idx) => (
                  <div key={idx} className="space-y-1.5 hover:opacity-100 opacity-90 transition-opacity">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-white bg-primary/10 px-2 py-1 rounded">{prof.name}</span>
                      <span className="text-primary text-xs font-bold">{prof.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden p-[1px] shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                        style={{ width: `${prof.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Projects Showcase
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
              A list of major development and audit projects, verified results, and structural hardening implementations.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {PROJECTS.map((proj) => (
              <Card key={proj.id} hoverEffect={true} className="flex flex-col bg-card border border-border/80 h-full p-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-bold bg-secondary/20 border-2 border-secondary/60 text-secondary uppercase tracking-wider hover:scale-105 transition-transform cursor-default shadow-lg shadow-secondary/10">
                    {proj.impact}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tags.map((tag, tIdx) => {
                    const securityTags = ['Cybersecurity', 'Network Security', 'Security', 'Ethical Hacking', 'Penetration Testing'];
                    const mlTags = ['Machine Learning', 'AI', 'Deep Learning', 'Neural Networks', 'Data Science', 'NLP'];
                    const webTags = ['React', 'TypeScript', 'Frontend', 'Backend', 'Full Stack', 'Web'];
                    const isSecurityTag = securityTags.some(st => tag.includes(st));
                    const isMLTag = mlTags.some(mt => tag.includes(mt));
                    const isWebTag = webTags.some(wt => tag.includes(wt));
                    
                    let bgClass = 'bg-muted text-muted-foreground border-muted/20';
                    if (isSecurityTag) {
                      bgClass = 'bg-primary/15 text-primary border border-primary/40 font-semibold';
                    } else if (isMLTag) {
                      bgClass = 'bg-secondary/15 text-secondary border border-secondary/40 font-semibold';
                    } else if (isWebTag) {
                      bgClass = 'bg-accent/15 text-accent border border-accent/40 font-semibold';
                    }
                    
                    return (
                      <span key={tIdx} className={`text-[10px] px-2.5 py-1 rounded-md transition-all hover:scale-105 ${bgClass}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <Button 
                  onClick={() => handleOpenProject(proj)} 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                >
                  Inspect Project & Code
                </Button>
              </Card>
            ))}
          </div>

          {/* Development Methodology */}
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">Methodology Flow</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Structured engineering practices implemented on every model and pipeline development cycle.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {METHODOLOGY_STEPS.map((step, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-border bg-card/30">
                  <div className="text-3xl font-extrabold text-primary/10 font-mono mb-2">{step.step}</div>
                  <h4 className="text-sm font-bold text-white uppercase mb-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Get in Touch
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
              Send a message to discuss project work, model analysis, or cybersecurity audits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Services (Left 5 Columns) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Contact Info Card */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Contact Info</h3>
                <div className="space-y-4">
                  <a href="mailto:tharanishbalaa@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/40 hover:border-primary/45 transition-all">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase font-semibold">Email</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">tharanishbalaa@gmail.com</div>
                    </div>
                  </a>

                  <a href="tel:+919159850002" className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/40 hover:border-primary/45 transition-all">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase font-semibold">Phone</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">+91 9159850002</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/40">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase font-semibold">Location</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">Coimbatore, Tamil Nadu, India</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Services Offered</h3>
                <div className="p-5 rounded-xl border border-border bg-card/40">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SERVICES.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Contact Form (Right 7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Inquiry Form</h3>
                <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 sm:p-8 rounded-xl border border-border bg-card/40 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-muted-foreground">Full Name</label>
                      <Input 
                        id="name"
                        type="text" 
                        placeholder="John Doe" 
                        {...register("name")}
                        className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.name && <p className="text-[10px] text-destructive font-medium">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Email Address</label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john@example.com" 
                        {...register("email")}
                        className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.email && <p className="text-[10px] text-destructive font-medium">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-semibold text-muted-foreground">Company (Optional)</label>
                    <Input 
                      id="company"
                      type="text" 
                      placeholder="Acme Corp" 
                      {...register("company")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-muted-foreground">Message Payload</label>
                    <Textarea 
                      id="message"
                      rows={5} 
                      placeholder="Describe the project scope or details here..." 
                      {...register("message")}
                      className={cn(errors.message && "border-destructive focus-visible:ring-destructive")}
                    />
                    {errors.message && <p className="text-[10px] text-destructive font-medium">{errors.message.message}</p>}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full flex items-center gap-2 justify-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        <span>Transmitting Data...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

          </div>

          {/* FAQs Section */}
          <div className="mt-24 space-y-6">
            <h3 className="text-2xl font-bold text-white text-center">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto space-y-4 pt-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-border bg-card/20 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-white hover:bg-card/40 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
                    </button>
                    <div 
                      className={cn(
                        "transition-all duration-300 overflow-hidden font-medium text-muted-foreground text-xs sm:text-sm leading-relaxed",
                        isOpen ? "max-h-60 border-t border-border p-5 bg-card/10" : "max-h-0"
                      )}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Detail Modal for Projects */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border bg-card/80 px-6 py-4">
              <span className="font-semibold text-white text-sm">
                Project Inspection Console
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-white p-1 hover:bg-muted/40 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs Selector */}
            {PROJECT_FILES[selectedProject.id] && PROJECT_FILES[selectedProject.id].length > 0 && (
              <div className="flex border-b border-border bg-card/45 px-6">
                <button
                  onClick={() => setActiveTab("report")}
                  className={cn(
                    "py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                    activeTab === "report" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-white"
                  )}
                >
                  Project Report
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={cn(
                    "py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                    activeTab === "code" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-white"
                  )}
                >
                  Code Inspector
                </button>
              </div>
            )}

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 bg-card/10">
              {activeTab === "code" ? (
                <div className="flex flex-col md:flex-row border border-border rounded-xl overflow-hidden bg-slate-950/70 h-[480px]">
                  {/* File Explorer Sidebar */}
                  <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border bg-card/25 p-4 overflow-y-auto h-1/3 md:h-full">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Folder className="h-3.5 w-3.5" />
                      workspace
                    </div>
                    <div className="space-y-1">
                      {PROJECT_FILES[selectedProject.id]?.map((file, idx) => {
                        const isActive = idx === activeFileIndex;
                        const isPython = file.name.endsWith(".py");
                        const isSql = file.name.endsWith(".sql");
                        const isMd = file.name.endsWith(".md");
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveFileIndex(idx)}
                            className={cn(
                              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left cursor-pointer",
                              isActive 
                                ? "bg-primary/15 text-primary border border-primary/20" 
                                : "text-muted-foreground hover:text-white hover:bg-card/45 border border-transparent"
                            )}
                          >
                            {isPython && <FileCode className="h-3.5 w-3.5 text-yellow-500" />}
                            {isSql && <Database className="h-3.5 w-3.5 text-blue-400" />}
                            {isMd && <FileText className="h-3.5 w-3.5 text-emerald-400" />}
                            {!isPython && !isSql && !isMd && <FileCode className="h-3.5 w-3.5 text-muted-foreground" />}
                            <span className="truncate">{file.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Editor Window */}
                  <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden h-2/3 md:h-full">
                    {/* Editor Tab Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-border/80">
                      <div className="flex items-center gap-1.5 text-xs text-white font-mono bg-slate-950 px-3 py-1.5 rounded-t-lg border-t border-x border-border/60">
                        {PROJECT_FILES[selectedProject.id]?.[activeFileIndex]?.name}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopyCode(PROJECT_FILES[selectedProject.id]?.[activeFileIndex]?.content || "")}
                        className="h-7 text-[10px] gap-1 px-2 text-muted-foreground hover:text-white border border-border bg-slate-900"
                      >
                        <Copy className="h-3 w-3" />
                        Copy Code
                      </Button>
                    </div>
                    
                    {/* Code Content with Line Numbers */}
                    <div className="flex-1 p-4 font-mono text-xs overflow-auto select-text text-slate-300 leading-relaxed custom-scrollbar bg-slate-950">
                      <table className="w-full border-collapse">
                        <tbody>
                          {PROJECT_FILES[selectedProject.id]?.[activeFileIndex]?.content
                            .split("\n")
                            .map((line, lIdx) => (
                              <tr key={lIdx} className="hover:bg-slate-900/40">
                                <td className="text-right pr-4 text-slate-600 select-none w-8 border-r border-slate-800 text-[10px] font-sans">
                                  {lIdx + 1}
                                </td>
                                <td className="pl-4 whitespace-pre font-mono text-[11px] align-top text-left">
                                  {line || " "}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">{selectedProject.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                      {projectDetailsMap[selectedProject.id]?.summary}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                      Technologies & Tools Used
                    </h4>
                    <div className="flex flex-wrap gap-2 pl-3">
                      {projectDetailsMap[selectedProject.id]?.techUsed.map((tech, idx) => (
                        <span key={idx} className="border border-border bg-card/80 px-2 py-1 text-xs text-muted-foreground font-semibold rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Audit Logs */}
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                      Implementation Milestones & Engineering Details
                    </h4>
                    <div className="bg-background border border-border/80 rounded-xl p-4.5 space-y-2.5">
                      {projectDetailsMap[selectedProject.id]?.auditLogs.map((log, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                          <span className="text-primary font-bold shrink-0">&gt;</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Metric */}
                  <div className="border-t border-border pt-4 flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Verification Metric:</span>
                    <span className="inline-flex items-center gap-1.5 text-secondary">
                      <ShieldCheck className="h-4.5 w-4.5" />
                      {selectedProject.impact}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border bg-card/50 px-6 py-4 flex justify-end">
              <Button onClick={() => setSelectedProject(null)} variant="outline" size="sm">
                Close Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
