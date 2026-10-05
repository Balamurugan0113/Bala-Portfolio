import { Cpu, Database, Globe, Lock, MonitorPlay, Radar, Server, Workflow, type LucideIcon } from 'lucide-react';

interface FlowStage {
  icon: LucideIcon;
  label: string;
}

/** Per-project pipeline stages for the architecture visualisation */
const FLOWS: Record<string, FlowStage[]> = {
  'digit-recognition': [
    { icon: MonitorPlay, label: 'Image Input' },
    { icon: Workflow, label: 'Preprocess' },
    { icon: Cpu, label: 'CNN Inference' },
    { icon: Radar, label: 'Softmax' },
    { icon: Globe, label: 'Prediction' },
  ],
  'intrusion-detection': [
    { icon: Radar, label: 'Packet Capture' },
    { icon: Workflow, label: 'Ring Buffer' },
    { icon: Cpu, label: 'Rule Engine' },
    { icon: Lock, label: 'Anomaly Heuristics' },
    { icon: Globe, label: 'Alert Pipeline' },
  ],
  'attendance-system': [
    { icon: MonitorPlay, label: 'Camera Feed' },
    { icon: Radar, label: 'Face Detection' },
    { icon: Cpu, label: '128D Embeddings' },
    { icon: Database, label: 'Identity Match' },
    { icon: Server, label: 'Attendance Log' },
  ],
  'sentiment-analyzer': [
    { icon: Globe, label: 'WebSocket Stream' },
    { icon: Workflow, label: 'Pre-processing' },
    { icon: Cpu, label: 'DistilBERT ONNX' },
    { icon: Radar, label: 'Aggregation' },
    { icon: Server, label: 'Alert Dispatch' },
  ],
  'aqi-detector': [
    { icon: Radar, label: 'IoT Sensors' },
    { icon: Globe, label: 'MQTT / TLS' },
    { icon: Database, label: 'Time-Series DB' },
    { icon: Cpu, label: 'Random Forest' },
    { icon: Server, label: 'HVAC Override' },
  ],
  'sign-translator': [
    { icon: MonitorPlay, label: 'Camera Frame' },
    { icon: Radar, label: 'MediaPipe Hands' },
    { icon: Database, label: '30-Frame Buffer' },
    { icon: Cpu, label: 'Bi-LSTM' },
    { icon: Globe, label: 'Text Output' },
  ],
  'discord-bots': [
    { icon: Globe, label: 'Discord Gateway' },
    { icon: Workflow, label: 'Plugin Loader' },
    { icon: Cpu, label: 'Command Router' },
    { icon: Database, label: 'PostgreSQL' },
    { icon: Server, label: 'Voice / Moderation' },
  ],
  'freelance-portals': [
    { icon: MonitorPlay, label: 'React UI' },
    { icon: Globe, label: 'REST API' },
    { icon: Lock, label: 'Auth Layer' },
    { icon: Database, label: 'PostgreSQL' },
    { icon: Server, label: 'CDN Deploy' },
  ],
  'memories-portals': [
    { icon: MonitorPlay, label: 'R3F Scene' },
    { icon: Cpu, label: 'Particle System' },
    { icon: Workflow, label: 'Post-processing' },
    { icon: Database, label: 'Lazy Assets' },
    { icon: Globe, label: 'CDN Edge' },
  ],
};

const GENERIC_FLOW: FlowStage[] = [
  { icon: MonitorPlay, label: 'Input' },
  { icon: Workflow, label: 'Processing' },
  { icon: Cpu, label: 'Model Core' },
  { icon: Globe, label: 'Output' },
];

export default function ArchitectureFlow({ projectId }: { projectId: string }) {
  const stages = FLOWS[projectId] ?? GENERIC_FLOW;

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 border border-[#F59E0B]/14" role="img" aria-label="System architecture pipeline diagram">
      <div className="text-[10px] font-mono2 font-bold text-[#94A3B8] uppercase tracking-[0.22em] mb-4">
        System Pipeline
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isLast = i === stages.length - 1;
          return (
            <div key={stage.label} className="flex flex-col md:flex-row items-center gap-1 flex-1 min-w-0">
              <div className="flow-node rounded-xl px-3 py-2.5 flex items-center gap-2.5 w-full md:flex-1 group/flow hover:border-[#F59E0B]/60 transition-colors">
                <span className="w-7 h-7 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 group-hover/flow:scale-105 transition-transform">
                  <Icon size={13} />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 leading-tight truncate">{stage.label}</span>
              </div>
              {!isLast && (
                <>
                  {/* horizontal connector (desktop) */}
                  <div className="hidden md:block relative w-6 lg:w-10 h-px flow-line shrink-0">
                    <span className="flow-dot absolute -top-[3px] w-1.5 h-1.5 rounded-full" />
                  </div>
                  {/* vertical connector (mobile) */}
                  <div className="md:hidden relative w-px h-5 flow-line-v shrink-0">
                    <span className="flow-dot-v absolute -left-[3px] w-1.5 h-1.5 rounded-full" />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
