import type { ReactElement } from 'react';
import type { Project } from '@/types';

/**
 * Realistic mini product-interface artwork rendered as inline SVG per project.
 * Deterministic, dependency-free, and animated with cheap CSS keyframes.
 */

const GRID = 'rgba(245,158,11,0.07)';
const AMBER = '#F59E0B';
const GOLD = '#FDE68A';
const ORANGE = '#F97316';
const CYAN = '#22D3EE';
const GREEN = '#10B981';
const RED = '#F87171';
const MUTED = '#94A3B8';

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pv-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(245,158,11,0.08)" />
          <stop offset="1" stopColor="rgba(5,5,8,0.4)" />
        </linearGradient>
        <linearGradient id="pv-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={AMBER} />
          <stop offset="1" stopColor={ORANGE} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="#07070c" />
      <g stroke={GRID} strokeWidth="1">
        {Array.from({ length: 20 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} />
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="200" />
        ))}
      </g>
      {children}
      <rect width="400" height="200" fill="url(#pv-fade)" opacity="0.5" />
    </svg>
  );
}

/* MNIST digit "3" as a 5×7 dot matrix */
const DIGIT_3 = [
  '11110',
  '10001',
  '00001',
  '01110',
  '00001',
  '10001',
  '11110',
];

function DigitRecognitionArt() {
  return (
    <Frame>
      <g transform="translate(56, 30)">
        {DIGIT_3.map((row, y) =>
          row.split('').map((c, x) =>
            c === '1' ? (
              <circle key={`${x}-${y}`} cx={x * 18} cy={y * 20} r="6" fill={AMBER} opacity={0.95} />
            ) : (
              <circle key={`${x}-${y}`} cx={x * 18} cy={y * 20} r="2" fill={MUTED} opacity={0.25} />
            )
          )
        )}
        <rect x="-12" y="-12" width="112" height="164" fill="none" stroke={AMBER} strokeOpacity="0.35" strokeDasharray="5 5" rx="8" />
      </g>
      <g transform="translate(210, 46)" fontFamily="JetBrains Mono, monospace">
        <text x="0" y="0" fill={MUTED} fontSize="9" letterSpacing="2">CNN · SOFTMAX</text>
        <text x="0" y="26" fill={GOLD} fontSize="20" fontWeight="700">PRED = 3</text>
        <text x="0" y="48" fill={GREEN} fontSize="11">conf 0.974</text>
        <rect x="0" y="60" width="130" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="0" y="60" width="126" height="6" rx="3" fill="url(#pv-line)" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 34} y="86" width="24" height={14 + (i % 3) * 12} rx="3" fill={AMBER} opacity={0.25 + i * 0.18} className="pv-anim-floaty" style={{ animationDelay: `${i * 0.4}s`, transformBox: 'fill-box' }} />
        ))}
        <text x="0" y="126" fill={MUTED} fontSize="8" letterSpacing="1">FEATURE MAPS</text>
      </g>
    </Frame>
  );
}

function IntrusionDetectionArt() {
  const nodes = [
    { x: 60, y: 100, label: 'GW', alert: false },
    { x: 160, y: 48, label: 'S1', alert: false },
    { x: 160, y: 152, label: 'S2', alert: false },
    { x: 268, y: 74, label: 'DB', alert: false },
    { x: 268, y: 132, label: 'API', alert: true },
    { x: 348, y: 100, label: 'NIDS', alert: false },
  ];
  const links: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 4]];
  return (
    <Frame>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={nodes[a].alert || nodes[b].alert ? RED : AMBER}
          strokeOpacity={nodes[a].alert || nodes[b].alert ? 0.7 : 0.3}
          strokeWidth={nodes[a].alert || nodes[b].alert ? 1.6 : 1}
          className={nodes[a].alert || nodes[b].alert ? undefined : 'pv-anim-dash'}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill="#0b0b12" stroke={n.alert ? RED : AMBER} strokeWidth="1.4" />
          <circle cx={n.x} cy={n.y} r="5" fill={n.alert ? RED : AMBER} className={n.alert ? 'pv-anim-pulse' : undefined} />
          <text x={n.x} y={n.y + 30} textAnchor="middle" fill={MUTED} fontSize="8" fontFamily="JetBrains Mono, monospace">{n.label}</text>
        </g>
      ))}
      <g fontFamily="JetBrains Mono, monospace">
        <rect x="228" y="14" width="150" height="20" rx="6" fill="rgba(248,113,113,0.12)" stroke={RED} strokeOpacity="0.5" />
        <text x="238" y="28" fill={RED} fontSize="9">⚠ PORT SCAN DETECTED</text>
        <text x="24" y="30" fill={MUTED} fontSize="8">PKTS 1.2M/s</text>
        <text x="24" y="182" fill={GREEN} fontSize="8">● ANALYZING</text>
      </g>
    </Frame>
  );
}

function AttendanceArt() {
  return (
    <Frame>
      <g transform="translate(120, 22)">
        {/* face ROI */}
        <rect x="0" y="0" width="110" height="140" rx="10" fill="none" stroke={AMBER} strokeOpacity="0.6" strokeWidth="1.4" />
        <rect x="4" y="4" width="14" height="14" fill="none" stroke={GOLD} strokeWidth="2" />
        <rect x="92" y="4" width="14" height="14" fill="none" stroke={GOLD} strokeWidth="2" />
        <rect x="4" y="122" width="14" height="14" fill="none" stroke={GOLD} strokeWidth="2" />
        <rect x="92" y="122" width="14" height="14" fill="none" stroke={GOLD} strokeWidth="2" />
        {/* landmark constellation */}
        {[
          [40, 40], [70, 40], [55, 52], [42, 70], [68, 70], [55, 62],
          [35, 88], [50, 96], [60, 96], [75, 88], [55, 108],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.4" fill={CYAN} className="pv-anim-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        <g stroke={CYAN} strokeOpacity="0.4" strokeWidth="0.8">
          <line x1="40" y1="40" x2="70" y2="40" /><line x1="40" y1="40" x2="55" y2="52" /><line x1="70" y1="40" x2="55" y2="52" />
          <line x1="42" y1="70" x2="68" y2="70" /><line x1="42" y1="70" x2="55" y2="62" /><line x1="68" y1="70" x2="55" y2="62" />
          <line x1="35" y1="88" x2="75" y2="88" /><line x1="35" y1="88" x2="50" y2="96" /><line x1="50" y1="96" x2="60" y2="96" />
          <line x1="60" y1="96" x2="75" y2="88" /><line x1="50" y1="96" x2="55" y2="108" /><line x1="60" y1="96" x2="55" y2="108" />
        </g>
      </g>
      <g transform="translate(268, 60)" fontFamily="JetBrains Mono, monospace">
        <text x="0" y="0" fill={MUTED} fontSize="9">128D EMBEDDING</text>
        <text x="0" y="22" fill={GOLD} fontSize="15" fontWeight="700">MATCH: BALA</text>
        <text x="0" y="44" fill={GREEN} fontSize="11">● L2 = 0.31 ✓</text>
        <rect x="0" y="56" width="104" height="24" rx="6" fill="rgba(16,185,129,0.1)" stroke={GREEN} strokeOpacity="0.4" />
        <text x="12" y="72" fill={GREEN} fontSize="10">CHECKED-IN 09:41</text>
      </g>
      <g transform="translate(24, 150)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect key={i} x={i * 13} y="0" width="8" height="20" rx="2" fill={i < 5 ? AMBER : 'rgba(255,255,255,0.08)'} />
        ))}
        <text x="0" y="36" fill={MUTED} fontSize="8" fontFamily="JetBrains Mono, monospace">SESSION ROSTER</text>
      </g>
    </Frame>
  );
}

function SentimentArt() {
  return (
    <Frame>
      <g fontFamily="JetBrains Mono, monospace">
        {/* chat stream */}
        <rect x="24" y="20" width="150" height="26" rx="9" fill="rgba(255,255,255,0.05)" />
        <text x="34" y="37" fill="#CBD5E1" fontSize="10">exam was stressful tbh</text>
        <rect x="60" y="54" width="140" height="26" rx="9" fill="rgba(248,113,113,0.12)" stroke={RED} strokeOpacity="0.3" />
        <text x="70" y="71" fill={RED} fontSize="10">NEG · 0.91 ✗</text>
        <rect x="24" y="88" width="160" height="26" rx="9" fill="rgba(255,255,255,0.05)" />
        <text x="34" y="105" fill="#CBD5E1" fontSize="10">but the lab session helped!</text>
        <rect x="60" y="122" width="140" height="26" rx="9" fill="rgba(16,185,129,0.12)" stroke={GREEN} strokeOpacity="0.3" />
        <text x="70" y="139" fill={GREEN} fontSize="10">POS · 0.88 ✓</text>
      </g>
      {/* rolling sentiment waveform */}
      <g transform="translate(236, 24)">
        <text x="0" y="0" fill={MUTED} fontSize="8" fontFamily="JetBrains Mono, monospace">SLIDING WINDOW</text>
        <path
          d="M0 60 L20 58 L34 44 L48 66 L62 52 L76 30 L90 48 L104 70 L118 54 L132 38 L146 30 L160 44"
          fill="none"
          stroke="url(#pv-line)"
          strokeWidth="2"
        />
        <line x1="0" y1="50" x2="164" y2="50" stroke={MUTED} strokeOpacity="0.3" strokeDasharray="3 4" />
        <circle cx="146" cy="30" r="4" fill={GOLD} className="pv-anim-pulse" />
        <rect x="0" y="84" width="164" height="26" rx="7" fill="rgba(245,158,11,0.1)" stroke={AMBER} strokeOpacity="0.4" />
        <text x="10" y="101" fill={GOLD} fontSize="10" fontFamily="JetBrains Mono, monospace">SPIKE ALERT → ADMIN</text>
      </g>
      <rect x="24" y="166" width="352" height="1.5" fill="url(#pv-line)" opacity="0.6" />
      <line x1="60" y1="160" x2="60" y2="172" stroke={AMBER} className="pv-anim-pulse" />
    </Frame>
  );
}

function AqiArt() {
  return (
    <Frame>
      <g transform="translate(30, 24)" fontFamily="JetBrains Mono, monospace">
        <text x="0" y="0" fill={MUTED} fontSize="9">PM2.5 · 24H FORECAST</text>
        {/* history */}
        <path d="M0 110 L24 102 L48 106 L72 88 L96 94 L120 76" fill="none" stroke={AMBER} strokeWidth="2" />
        {/* forecast */}
        <path d="M120 76 L144 84 L168 72 L192 64 L216 58 L240 52" fill="none" stroke={CYAN} strokeWidth="2" strokeDasharray="5 5" className="pv-anim-dash" />
        <circle cx="120" cy="76" r="4" fill={GOLD} />
        <text x="128" y="70" fill={CYAN} fontSize="8">PRED</text>
        <line x1="0" y1="120" x2="240" y2="120" stroke={MUTED} strokeOpacity="0.25" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={i * 60} y="120" width="2" height="5" fill={MUTED} opacity="0.4" />
            <text x={i * 60} y="138" fill={MUTED} fontSize="8" opacity="0.7">{`-${(5 - i) * 4}h`}</text>
          </g>
        ))}
      </g>
      <g transform="translate(300, 30)">
        <circle cx="34" cy="34" r="32" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
        <circle cx="34" cy="34" r="32" fill="none" stroke={ORANGE} strokeWidth="7" strokeDasharray="150 201" strokeLinecap="round" transform="rotate(-90 34 34)" />
        <text x="34" y="31" textAnchor="middle" fill={GOLD} fontSize="16" fontWeight="700" fontFamily="JetBrains Mono, monospace">142</text>
        <text x="34" y="45" textAnchor="middle" fill={MUTED} fontSize="8" fontFamily="JetBrains Mono, monospace">AQI</text>
        <text x="34" y="84" textAnchor="middle" fill={ORANGE} fontSize="9" fontFamily="JetBrains Mono, monospace">VENT ON</text>
      </g>
      <g transform="translate(300, 128)" fontFamily="JetBrains Mono, monospace">
        <text x="0" y="0" fill={MUTED} fontSize="8">MQTT · TLS ▸</text>
        <text x="0" y="16" fill={GREEN} fontSize="8">● 12 NODES LIVE</text>
      </g>
    </Frame>
  );
}

function SignTranslatorArt() {
  // hand landmarks (simplified MediaPipe skeleton)
  const joints: [number, number][] = [
    [50, 140], [42, 112], [38, 88], [40, 68],           // wrist → pinky
    [50, 140], [56, 104], [58, 80], [60, 60],           // ring
    [50, 140], [68, 96], [74, 70], [78, 50],            // middle
    [50, 140], [80, 110], [90, 90], [98, 76],           // index
    [50, 140], [64, 128], [80, 124], [94, 122],         // thumb
  ];
  const bones = [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [8, 9], [9, 10], [10, 11], [12, 13], [13, 14], [14, 15], [16, 17], [17, 18], [18, 19], [0, 4], [4, 8], [8, 12], [12, 16]];
  return (
    <Frame>
      <g transform="translate(60, 8)">
        {bones.map(([a, b], i) => (
          <line key={i} x1={joints[a][0]} y1={joints[a][1]} x2={joints[b][0]} y2={joints[b][1]} stroke={AMBER} strokeOpacity="0.75" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        {joints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.4" fill={i === 0 ? GOLD : CYAN} className="pv-anim-pulse" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </g>
      <g transform="translate(230, 52)" fontFamily="JetBrains Mono, monospace">
        <text x="0" y="0" fill={MUTED} fontSize="9">LSTM · 30 FRAME BUFFER</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={i * 17} y="14" width="10" height="26" rx="2" fill={AMBER} opacity={0.25 + (i % 4) * 0.22} className="pv-anim-eq" style={{ animationDelay: `${i * 0.14}s`, transformBox: 'fill-box' }} />
        ))}
        <text x="0" y="66" fill={MUTED} fontSize="9">TRANSLATION →</text>
        <rect x="0" y="76" width="130" height="34" rx="8" fill="rgba(245,158,11,0.12)" stroke={AMBER} strokeOpacity="0.5" />
        <text x="14" y="99" fill={GOLD} fontSize="18" fontWeight="700" letterSpacing="3">HELLO</text>
        <text x="0" y="132" fill={GREEN} fontSize="9">● 24 FPS · CONF 0.93</text>
      </g>
    </Frame>
  );
}

function DiscordBotArt() {
  return (
    <Frame>
      <g fontFamily="JetBrains Mono, monospace">
        <rect x="24" y="18" width="200" height="28" rx="9" fill="rgba(88,101,242,0.14)" stroke="#5865F2" strokeOpacity="0.4" />
        <text x="36" y="36" fill="#CBD5E1" fontSize="10">/play lofistudy.mp3</text>
        <rect x="24" y="54" width="230" height="28" rx="9" fill="rgba(255,255,255,0.05)" />
        <text x="36" y="72" fill={GREEN} fontSize="10">♪ queued #12 — 192kbps</text>
        <rect x="24" y="90" width="180" height="28" rx="9" fill="rgba(255,255,255,0.05)" />
        <text x="36" y="108" fill={RED} fontSize="10">/ban @spammer — done ✓</text>
        {/* equalizer */}
        <g transform="translate(290, 34)">
          <text x="-4" y="-8" fill={MUTED} fontSize="8">VC STREAM</text>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={i * 13} y={0} width="8" height="64" rx="3" fill={AMBER} opacity={0.3 + (i % 3) * 0.3} className="pv-anim-eq" style={{ animationDelay: `${i * 0.13}s`, transformBox: 'fill-box' }} />
          ))}
        </g>
        {/* stats */}
        <g transform="translate(24, 140)">
          <rect x="0" y="0" width="110" height="40" rx="9" fill="rgba(16,185,129,0.08)" stroke={GREEN} strokeOpacity="0.3" />
          <text x="12" y="17" fill={GREEN} fontSize="9">● 15+ SERVERS</text>
          <text x="12" y="32" fill={MUTED} fontSize="8">SHARD 0 · 42ms</text>
          <rect x="124" y="0" width="150" height="40" rx="9" fill="rgba(88,101,242,0.1)" stroke="#5865F2" strokeOpacity="0.3" />
          <text x="136" y="17" fill="#A5B4FC" fontSize="9">PLUGINS 7 ACTIVE</text>
          <text x="136" y="32" fill={MUTED} fontSize="8">mod · music · utils</text>
        </g>
      </g>
    </Frame>
  );
}

function FreelanceArt() {
  return (
    <Frame>
      <g>
        <rect x="30" y="24" width="340" height="140" rx="10" fill="#0b0b13" stroke="rgba(255,255,255,0.1)" />
        <rect x="30" y="24" width="340" height="22" rx="10" fill="rgba(255,255,255,0.04)" />
        <circle cx="44" cy="35" r="4" fill={RED} opacity="0.7" />
        <circle cx="56" cy="35" r="4" fill={AMBER} opacity="0.7" />
        <circle cx="68" cy="35" r="4" fill={GREEN} opacity="0.7" />
        <rect x="120" y="30" width="180" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
        {/* layout blocks */}
        <rect x="44" y="58" width="120" height="40" rx="6" fill="rgba(245,158,11,0.16)" stroke={AMBER} strokeOpacity="0.4" />
        <text x="58" y="82" fill={GOLD} fontSize="10" fontFamily="JetBrains Mono, monospace">HERO</text>
        <rect x="174" y="58" width="82" height="40" rx="6" fill="rgba(255,255,255,0.05)" />
        <rect x="266" y="58" width="90" height="40" rx="6" fill="rgba(255,255,255,0.05)" />
        <rect x="44" y="106" width="150" height="44" rx="6" fill="rgba(34,211,238,0.08)" stroke={CYAN} strokeOpacity="0.3" />
        <text x="58" y="132" fill={CYAN} fontSize="10" fontFamily="JetBrains Mono, monospace">RESPONSIVE</text>
        <rect x="204" y="106" width="152" height="44" rx="6" fill="rgba(16,185,129,0.08)" stroke={GREEN} strokeOpacity="0.3" />
        <text x="218" y="126" fill={GREEN} fontSize="9" fontFamily="JetBrains Mono, monospace">SEO 100/100</text>
        <text x="218" y="140" fill={MUTED} fontSize="8" fontFamily="JetBrains Mono, monospace">Core Vitals ✓</text>
      </g>
    </Frame>
  );
}

function MemoriesArt() {
  return (
    <Frame>
      {/* floating memory cards */}
      {[
        { x: 60, y: 46, r: -8, o: 0.9 }, { x: 150, y: 30, r: 6, o: 0.7 },
        { x: 240, y: 52, r: -5, o: 0.8 }, { x: 100, y: 118, r: 7, o: 0.6 },
        { x: 196, y: 108, r: -9, o: 0.75 }, { x: 290, y: 118, r: 4, o: 0.65 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x}, ${c.y}) rotate(${c.r})`} className="pv-anim-floaty" style={{ animationDelay: `${i * 0.6}s`, transformBox: 'fill-box' }}>
          <rect x="-22" y="-28" width="44" height="56" rx="6" fill="rgba(245,158,11,0.1)" stroke={AMBER} strokeOpacity={0.35 + c.o * 0.3} />
          <circle cx="0" cy="-10" r="8" fill={i % 2 ? CYAN : AMBER} opacity={0.4} />
          <rect x="-14" y="6" width="28" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="-14" y="14" width="18" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        </g>
      ))}
      {/* particles */}
      {Array.from({ length: 18 }, (_, i) => (
        <circle
          key={i}
          cx={20 + ((i * 53) % 360)}
          cy={14 + ((i * 37) % 170)}
          r={i % 4 === 0 ? 2 : 1.2}
          fill={i % 5 === 0 ? CYAN : AMBER}
          opacity="0.5"
          className="pv-anim-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </Frame>
  );
}

const ART_MAP: Record<string, () => ReactElement> = {
  'digit-recognition': DigitRecognitionArt,
  'intrusion-detection': IntrusionDetectionArt,
  'attendance-system': AttendanceArt,
  'sentiment-analyzer': SentimentArt,
  'aqi-detector': AqiArt,
  'sign-translator': SignTranslatorArt,
  'discord-bots': DiscordBotArt,
  'freelance-portals': FreelanceArt,
  'memories-portals': MemoriesArt,
};

export default function ProjectVisual({ project, className = '' }: { project: Project; className?: string }) {
  const Art = ART_MAP[project.id];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {Art ? <Art /> : (
        <Frame>
          <rect x="140" y="70" width="120" height="60" rx="10" fill="none" stroke={AMBER} strokeOpacity="0.5" />
          <text x="200" y="105" textAnchor="middle" fill={GOLD} fontSize="12" fontFamily="JetBrains Mono, monospace">
            {project.id.toUpperCase().slice(0, 12)}
          </text>
        </Frame>
      )}
      {/* glass reflection */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
    </div>
  );
}
