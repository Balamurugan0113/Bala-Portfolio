import { useState, useMemo } from 'react';
import { Copy, FileCode, FileText, Database, Folder, Check } from 'lucide-react';
import type { ProjectFile } from '@shared/projectFiles';
import { highlight, type TokenKind } from './highlight';
import { cn } from '@/lib/utils';
import { soundFx } from '@/lib/sound';

const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: 'text-slate-300',
  comment: 'text-slate-500 italic',
  string: 'text-emerald-300/90',
  keyword: 'text-[#F59E0B] font-semibold',
  number: 'text-orange-300',
  fn: 'text-cyan-300',
  decorator: 'text-[#FBBF24]',
  heading: 'text-[#FBBF24] font-bold',
  key: 'text-cyan-300',
  bool: 'text-purple-300',
  tag: 'text-slate-400',
};

function fileIcon(name: string) {
  if (name.endsWith('.py')) return <FileCode className="h-3.5 w-3.5 text-[#F59E0B]" />;
  if (name.endsWith('.sql')) return <Database className="h-3.5 w-3.5 text-cyan-400" />;
  if (name.endsWith('.md')) return <FileText className="h-3.5 w-3.5 text-emerald-400" />;
  if (name.endsWith('.json') || name.endsWith('.txt')) return <FileText className="h-3.5 w-3.5 text-amber-200" />;
  return <FileCode className="h-3.5 w-3.5 text-slate-400" />;
}

/**
 * Premium IDE-style source inspector: file tree, syntax-highlighted viewer,
 * line numbers, copy-to-clipboard. Zero external highlighting dependencies.
 */
export default function CodeInspector({ files }: { files: ProjectFile[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = files[activeIndex];

  const lines = useMemo(
    () => (active ? highlight(active.content, active.language) : []),
    [active]
  );

  const handleCopy = () => {
    if (!active) return;
    navigator.clipboard.writeText(active.content).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (!active) return null;

  return (
    <div className="ide-panel rounded-2xl overflow-hidden flex flex-col md:flex-row h-[52vh] min-h-[320px] max-h-[560px]">
      {/* file tree */}
      <div className="md:w-48 lg:w-56 border-b md:border-b-0 md:border-r border-white/[0.06] p-3 overflow-y-auto bg-black/30 shrink-0">
        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-1.5 px-1 font-mono2">
          <Folder className="h-3.5 w-3.5 text-[#F59E0B]" /> workspace
        </div>
        <div className="space-y-1" role="tablist" aria-label="Project source files">
          {files.map((file, idx) => (
            <button
              key={file.name}
              role="tab"
              aria-selected={idx === activeIndex}
              onClick={() => { setActiveIndex(idx); soundFx.playClick(); }}
              className={cn(
                'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left',
                idx === activeIndex
                  ? 'bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/35 shadow-[0_0_16px_-6px_rgba(245,158,11,0.4)]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
              )}
            >
              {fileIcon(file.name)}
              <span className="truncate font-mono2">{file.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 px-1 pt-3 border-t border-white/[0.06]">
          <div className="text-[9px] text-[#94A3B8]/60 font-mono2 leading-relaxed">
            {files.length} files · {active.language}
          </div>
        </div>
      </div>

      {/* editor */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* tab bar */}
        <div className="flex items-center justify-between gap-2 pl-2 pr-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex gap-1.5 shrink-0" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </span>
            <span className="ml-2 text-xs text-slate-200 font-mono2 px-3 py-1 rounded-t-lg bg-[#0A0A12] border-t border-x border-[#F59E0B]/25 truncate">
              {active.name}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              'h-7 shrink-0 text-[10px] gap-1.5 px-2.5 rounded-lg flex items-center border transition-colors',
              copied
                ? 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10'
                : 'text-[#94A3B8] hover:text-white border-white/10 hover:border-[#F59E0B]/40 hover:bg-white/5'
            )}
            aria-label={`Copy contents of ${active.name}`}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>

        {/* code */}
        <div className="flex-1 overflow-auto font-mono2 text-[11px] leading-relaxed bg-[#050509]" role="tabpanel" aria-label={`${active.name} source code`}>
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((tokens, i) => (
                <tr key={i} className="hover:bg-white/[0.025] group/line">
                  <td className="text-right pr-3 pl-3 text-[10px] text-slate-600 select-none w-[3.2rem] align-top border-r border-white/[0.05] font-sans sticky left-0 bg-[#050509]">
                    {i + 1}
                  </td>
                  <td className="pl-4 pr-4 whitespace-pre-wrap break-words align-top text-slate-300">
                    {tokens.length === 0 ? ' ' : tokens.map((t, j) => (
                      <span key={j} className={TOKEN_CLASS[t.kind]}>{t.text}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
