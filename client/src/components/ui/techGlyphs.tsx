import type { ComponentType, SVGProps } from 'react';
import {
  Brain, Bug, Cloud, Code2, Database, Eye, GitBranch, Github,
  Network, ScanFace, Server, ShieldCheck, Waves, Wind,
  BarChart3, LineChart, Boxes, Layers, Zap, Globe, Lock, Workflow,
  Container, Gauge, Braces, Bot, Hexagon, ArrowLeftRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Custom brand glyphs — hand-drawn simplified SVG marks (24×24 space) */
/* ------------------------------------------------------------------ */

type GlyphProps = SVGProps<SVGSVGElement> & { size?: number };

function svgProps({ size = 20, ...rest }: GlyphProps): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
    ...rest,
  };
}

/** React atom — three rotated ellipses + nucleus */
function ReactGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

/** Python — two interlocking mirrored snakes */
function PythonGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M11.9 2c-2.4 0-4.1 1.2-4.1 3.7v2.1h4.4v.9H5.3C3.1 8.7 2 10.4 2 12.8s1.1 4 3.3 4h2v-3.4c0-1.9 1.6-3.5 3.5-3.5h4.9c1.7 0 3.1-1.4 3.1-3.1V5.7C18.8 3.2 17.1 2 14.7 2h-2.8zm-1.9 2.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      <path d="M11.9 2c-2.4 0-4.1 1.2-4.1 3.7v2.1h4.4v.9H5.3C3.1 8.7 2 10.4 2 12.8s1.1 4 3.3 4h2v-3.4c0-1.9 1.6-3.5 3.5-3.5h4.9c1.7 0 3.1-1.4 3.1-3.1V5.7C18.8 3.2 17.1 2 14.7 2h-2.8zm-1.9 2.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" transform="rotate(180 12 12)" opacity="0.62" />
    </svg>
  );
}

/** Docker — stacked containers */
function DockerGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <rect x="3" y="9" width="3" height="3" rx="0.4" />
      <rect x="7" y="9" width="3" height="3" rx="0.4" />
      <rect x="11" y="9" width="3" height="3" rx="0.4" />
      <rect x="7" y="5.5" width="3" height="3" rx="0.4" />
      <rect x="11" y="5.5" width="3" height="3" rx="0.4" />
      <rect x="11" y="2" width="3" height="3" rx="0.4" />
      <path d="M2.2 13.5h15.4c.4 0 .6.4.4.8-.9 1.7-2.6 3-4.7 3.4l-1.4 2a.9.9 0 0 1-1.5 0l-1.4-2c-2.9-.4-5.3-2-6.9-4.2-.2-.3 0-1 .1-1z" />
    </svg>
  );
}

/** FastAPI — lightning bolt */
function BoltGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M13.5 2 4 13.6h6L9.4 22 20 9.9h-6.6L13.5 2z" />
    </svg>
  );
}

/** TensorFlow — geometric TF */
function TFGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M4 3h4v14h8v4H4V3z" />
      <path d="M11 8.5h4V13h-4z" opacity="0.55" />
      <path d="M16 3h4v5.5h-4z" opacity="0.8" />
    </svg>
  );
}

/** Keras — K monogram */
function KerasGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M5 3h3.4v6.8L13.2 3H17l-5.6 7.6L17.4 21h-4l-5-7v7H5V3z" />
    </svg>
  );
}

/** PyTorch — flame */
function PyTorchGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M12 2.2 8.3 6.5a7.6 7.6 0 1 0 7.4 0L12 2.2zm-.2 3.5 1.9 2.1a5.2 5.2 0 1 1-3.8 0l1.9-2.1z" />
      <circle cx="12" cy="14.6" r="2" />
    </svg>
  );
}

/** Scikit-learn — SK */
function SkGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M4 3h2.8l4.4 6.5V3H14v18h-2.8v-6.7L6.8 21H4l5-8.9L4 3z" />
      <path d="M16.5 3h3.5v4h-3.5zM16.5 17h3.5v4h-3.5zM16.5 9.5h3.5v5h-3.5z" opacity="0.6" />
    </svg>
  );
}

/** Linux / Tux — stylized terminal penguin beak + belly */
function LinuxGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M12 2c-2 0-3.3 1.6-3.3 3.7 0 1.3.4 2.3.9 3.4-1 1.4-1.9 3.5-1.9 5.6 0 1.8.6 3.3 1.5 4.2-.5 1-.8 2.1-.8 3.1h9.2c0-1-.3-2.1-.8-3.1.9-.9 1.5-2.4 1.5-4.2 0-2.1-.9-4.2-1.9-5.6.5-1.1.9-2.1.9-3.4C15.3 3.6 14 2 12 2zm0 3.1a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
    </svg>
  );
}

/** Nmap / scan radar */
function NmapGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} stroke="currentColor" strokeWidth="1.6" fill="none">
      <circle cx="12" cy="12" r="9" opacity="0.35" />
      <circle cx="12" cy="12" r="5.5" opacity="0.6" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 12 18.5 5.5" strokeWidth="2" />
    </svg>
  );
}

/** Wireshark — waves */
function WiresharkGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round">
      <path d="M2.5 13c2-3 4-3 6 0s4 3 6 0 3.5-2.2 5-1" />
      <path d="M2.5 18c2-3 4-3 6 0s4 3 6 0 3.5-2.2 5-1" opacity="0.5" />
      <path d="M5 7.5c1.5-2.2 3-2.2 4.5 0s3 2.2 4.5 0" opacity="0.7" />
    </svg>
  );
}

/** Metasploit — exploit brackets */
function MetasploitGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4 3 8l5 4M16 4l5 4-5 4" />
      <path d="M13.5 3.5 10.5 20.5" />
    </svg>
  );
}

/** PostgreSQL — simplified elephant */
function PostgresGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3.5c-2.5 0-4 1.8-4 4.2 0 1.4.4 2.4 1 3.6-.6 2-1 4.4-1 6.7 0 1.4 1.1 2.5 2.5 2.5h.5l.5 2h8l.5-2.2c2.6-.6 4.5-2.9 4.5-5.6 0-2.6-1-5-2.4-6.6.3-1 .4-1.9.4-2.4 0-2.4-1.5-4.2-4-4.2-1.5 0-2.8.7-3.5 1.8-.6-.4-1.5-.8-3-.8z" />
      <circle cx="8.5" cy="8" r="0.6" fill="currentColor" />
      <circle cx="14" cy="8" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Discord — controller face */
function DiscordGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} fill="currentColor">
      <path d="M9.4 3C7 3 4.8 4.4 3.9 6.7 3 9 2.5 11.7 3 16.3c.1 1.1.7 2.1 1.7 2.6l1.1 2.2c.2.5.9.5 1.1 0l.7-1.4c1.5.2 4.3.2 5.8 0l.7 1.4c.2.5.9.5 1.1 0l1.1-2.2c1-.5 1.6-1.5 1.7-2.6.5-4.6 0-7.3-.9-9.6C16.2 4.4 14 3 11.6 3H9.4zM7.3 8.2h6.4c.8 0 1.4.6 1.4 1.4v3.2c0 .8-.6 1.4-1.4 1.4H9.2l-2.1 1.8v-1.8c-.7-.1-1.2-.7-1.2-1.4V9.6c0-.8.6-1.4 1.4-1.4zm1.1 1.6a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4zm4.2 0a.7.7 0 1 0 0 1.4.7.7 0 0 0 0-1.4z" />
    </svg>
  );
}

/** MQTT / IoT */
function MqttGlyph(p: GlyphProps) {
  return (
    <svg {...svgProps(p)} stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round">
      <circle cx="12" cy="17" r="1.8" fill="currentColor" stroke="none" />
      <path d="M8.2 13.2a5.4 5.4 0 0 1 7.6 0" />
      <path d="M5.2 10.2a9.6 9.6 0 0 1 13.6 0" opacity="0.6" />
      <path d="M2.6 7.4a13.4 13.4 0 0 1 18.8 0" opacity="0.3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export type TechKey =
  | 'python' | 'tensorflow' | 'keras' | 'pytorch' | 'scikit' | 'react' | 'fastapi'
  | 'docker' | 'linux' | 'github' | 'postgres' | 'database' | 'aws' | 'network'
  | 'security' | 'opencv' | 'mediapipe' | 'mqtt' | 'nlp' | 'wireshark' | 'nmap'
  | 'burp' | 'metasploit' | 'discord' | 'nodejs' | 'websocket' | 'ml' | 'pandas'
  | 'numpy' | 'matplotlib' | 'git' | 'vercel' | 'sqlite' | 'tailwind' | 'typescript'
  | 'css' | 'onnx' | 'api' | 'iot' | 'code' | 'cloud' | 'server' | 'bot' | 'audio'
  | '3dweb' | 'redis' | 'monitoring' | 'cicd' | 'ldap' | 'kubernetes';

export interface TechDef {
  label: string;
  color: string;       // rgb triplet "r, g, b"
  glyph: ComponentType<{ size?: number; className?: string }>;
}

const L = (Icon: ComponentType<{ size?: number; className?: string }>) => Icon;

export const TECH_DEFS: Record<TechKey, TechDef> = {
  python:     { label: 'Python',      color: '55, 118, 171',   glyph: PythonGlyph },
  tensorflow: { label: 'TensorFlow',  color: '255, 143, 0',    glyph: TFGlyph },
  keras:      { label: 'Keras',       color: '224, 0, 0',      glyph: KerasGlyph },
  pytorch:    { label: 'PyTorch',     color: '238, 76, 44',    glyph: PyTorchGlyph },
  scikit:     { label: 'Scikit-Learn',color: '248, 153, 57',   glyph: SkGlyph },
  react:      { label: 'React',       color: '97, 218, 251',   glyph: ReactGlyph },
  fastapi:    { label: 'FastAPI',     color: '5, 153, 139',    glyph: BoltGlyph },
  docker:     { label: 'Docker',      color: '36, 150, 237',   glyph: DockerGlyph },
  linux:      { label: 'Linux',       color: '252, 198, 36',   glyph: LinuxGlyph },
  github:     { label: 'GitHub',      color: '226, 232, 240',  glyph: L(Github) },
  postgres:   { label: 'PostgreSQL',  color: '51, 103, 145',   glyph: PostgresGlyph },
  database:   { label: 'Database',    color: '56, 189, 248',   glyph: L(Database) },
  aws:        { label: 'AWS',         color: '255, 153, 0',    glyph: L(Cloud) },
  cloud:      { label: 'Cloud',       color: '255, 153, 0',    glyph: L(Cloud) },
  network:    { label: 'Networking',  color: '34, 211, 238',   glyph: L(Network) },
  security:   { label: 'Security',    color: '245, 158, 11',   glyph: L(ShieldCheck) },
  opencv:     { label: 'OpenCV',      color: '139, 92, 246',   glyph: L(Eye) },
  mediapipe:  { label: 'MediaPipe',   color: '22, 163, 74',    glyph: L(ScanFace) },
  mqtt:       { label: 'MQTT',        color: '148, 118, 230',  glyph: MqttGlyph },
  iot:        { label: 'IoT',         color: '148, 118, 230',  glyph: MqttGlyph },
  nlp:        { label: 'NLP',         color: '251, 191, 36',   glyph: L(Brain) },
  ml:         { label: 'Machine Learning', color: '245, 158, 11', glyph: L(Brain) },
  wireshark:  { label: 'Wireshark',   color: '18, 179, 200',   glyph: WiresharkGlyph },
  nmap:       { label: 'Nmap',        color: '34, 197, 94',    glyph: NmapGlyph },
  burp:       { label: 'Burp Suite',  color: '249, 115, 22',   glyph: L(Bug) },
  metasploit: { label: 'Metasploit',  color: '225, 29, 72',    glyph: MetasploitGlyph },
  discord:    { label: 'Discord',     color: '88, 101, 242',   glyph: DiscordGlyph },
  nodejs:     { label: 'Node.js',     color: '60, 135, 58',    glyph: L(Hexagon) },
  websocket:  { label: 'WebSockets',  color: '139, 92, 246',   glyph: L(ArrowLeftRight) },
  pandas:     { label: 'Pandas',      color: '150, 84, 226',   glyph: L(BarChart3) },
  numpy:      { label: 'NumPy',       color: '77, 171, 207',   glyph: L(Layers) },
  matplotlib: { label: 'Matplotlib',  color: '255, 111, 0',    glyph: L(LineChart) },
  git:        { label: 'Git',         color: '240, 80, 50',    glyph: L(GitBranch) },
  vercel:     { label: 'Vercel',      color: '226, 232, 240',  glyph: L(Zap) },
  sqlite:     { label: 'SQLite',      color: '0, 164, 219',    glyph: L(Database) },
  tailwind:   { label: 'Tailwind',    color: '56, 189, 248',   glyph: L(Wind) },
  typescript: { label: 'TypeScript',  color: '49, 120, 198',   glyph: L(Braces) },
  css:        { label: 'CSS3',        color: '56, 189, 248',   glyph: L(Wind) },
  onnx:       { label: 'ONNX',        color: '51, 103, 145',   glyph: L(Workflow) },
  api:        { label: 'REST API',    color: '226, 232, 240',  glyph: L(Globe) },
  code:       { label: 'Code',        color: '245, 158, 11',   glyph: L(Code2) },
  server:     { label: 'Server',      color: '16, 185, 129',   glyph: L(Server) },
  bot:        { label: 'Bot',         color: '88, 101, 242',   glyph: L(Bot) },
  audio:      { label: 'Audio',       color: '244, 114, 182',  glyph: L(Waves) },
  '3dweb':    { label: '3D Web',      color: '168, 85, 247',   glyph: L(Boxes) },
  redis:      { label: 'Redis',       color: '220, 56, 45',    glyph: L(Gauge) },
  monitoring: { label: 'Monitoring',  color: '16, 185, 129',   glyph: L(Gauge) },
  cicd:        { label: 'CI/CD',      color: '34, 211, 238',   glyph: L(Workflow) },
  ldap:       { label: 'Auth',        color: '245, 158, 11',   glyph: L(Lock) },
  kubernetes: { label: 'Kubernetes',  color: '51, 103, 145',   glyph: L(Container) },
};

/**
 * Fuzzy-match a free-form skill / tag string to a tech definition.
 * e.g. "Python (Automation & Security Scripts)" → python
 */
export function matchTech(name: string): TechDef {
  const n = name.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => n.includes(k));

  if (has('burp')) return TECH_DEFS.burp;
  if (has('metasploit')) return TECH_DEFS.metasploit;
  if (has('wireshark')) return TECH_DEFS.wireshark;
  if (has('nmap')) return TECH_DEFS.nmap;
  if (has('tensorflow')) return TECH_DEFS.tensorflow;
  if (has('keras')) return TECH_DEFS.keras;
  if (has('pytorch')) return TECH_DEFS.pytorch;
  if (has('scikit', 'sklearn')) return TECH_DEFS.scikit;
  if (has('mediapipe')) return TECH_DEFS.mediapipe;
  if (has('opencv', 'computer vision', 'face recognition')) return TECH_DEFS.opencv;
  if (has('onnx')) return TECH_DEFS.onnx;
  if (has('lstm', 'cnn', 'deep learning', 'transformers', 'nlp', 'bert')) return TECH_DEFS.nlp;
  if (has('machine learning', ' ai ', 'inference', 'model')) return TECH_DEFS.ml;
  if (has('python', 'pandas', 'numpy', 'eda')) {
    if (has('pandas')) return TECH_DEFS.pandas;
    if (has('numpy')) return TECH_DEFS.numpy;
    return TECH_DEFS.python;
  }
  if (has('matplotlib', 'seaborn', 'visualization')) return TECH_DEFS.matplotlib;
  if (has('statistic', 'analytics', 'data scien')) return TECH_DEFS.pandas;
  if (has('penetration', 'pentest', 'ethical', 'exploit', 'hacking', 'cyber', 'security', 'vulnerab', 'nids', 'packet')) return TECH_DEFS.security;
  if (has('fastapi', 'rest api', 'api')) return TECH_DEFS.fastapi;
  if (has('react', 'frontend', 'web app', 'responsive ui', 'dashboard')) return TECH_DEFS.react;
  if (has('websocket')) return TECH_DEFS.websocket;
  if (has('discord')) return TECH_DEFS.discord;
  if (has('docker', 'container')) return TECH_DEFS.docker;
  if (has('kubernetes', 'k8s')) return TECH_DEFS.kubernetes;
  if (has('aws', 'cloud')) return TECH_DEFS.aws;
  if (has('linux', 'system hardening')) return TECH_DEFS.linux;
  if (has('postgres', 'sql')) return TECH_DEFS.postgres;
  if (has('redis')) return TECH_DEFS.redis;
  if (has('mqtt', 'iot', 'sensor')) return TECH_DEFS.iot;
  if (has('network', 'tcp', 'protocol')) return TECH_DEFS.network;
  if (has('github action', 'ci/cd', 'cicd')) return TECH_DEFS.cicd;
  if (has('prometheus', 'grafana', 'monitoring')) return TECH_DEFS.monitoring;
  if (has('jwt', 'oauth', 'auth')) return TECH_DEFS.ldap;
  if (has('git')) return TECH_DEFS.git;
  if (has('typescript')) return TECH_DEFS.typescript;
  if (has('tailwind', 'css')) return TECH_DEFS.css;
  if (has('node')) return TECH_DEFS.nodejs;
  if (has('audio', 'sound')) return TECH_DEFS.audio;
  if (has('3d', 'three.js', 'canvas', 'webgl')) return TECH_DEFS['3dweb'];
  if (has('bot')) return TECH_DEFS.bot;
  if (has('database', 'db')) return TECH_DEFS.database;
  if (has('server', 'backend')) return TECH_DEFS.server;
  return TECH_DEFS.code;
}
