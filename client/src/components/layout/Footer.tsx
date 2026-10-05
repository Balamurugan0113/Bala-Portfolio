import { Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { soundFx } from '@/lib/sound';

const SOCIALS = [
  { icon: Instagram, href: 'https://www.instagram.com/balaa.xx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Balamurugan0113', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer 
      className="relative z-20 py-4 sm:py-5 overflow-hidden bg-gradient-to-t from-[#050508] via-[#050508]/95 to-transparent dark:from-[#050508] dark:via-[#050508]/95 light:from-slate-100 light:via-slate-50/90" 
      role="contentinfo"
    >
      {/* Top Glowing Gradient Divider Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/35 to-transparent" />
      
      {/* Ambient Theme Color Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(245,158,11,0.08),transparent_75%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Compact Footer Text with Amber Gradient Accent */}
        <p className="text-[11px] sm:text-xs tracking-wider text-muted-foreground text-center sm:text-left font-mono">
          &copy; {new Date().getFullYear()}{' '}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#F97316]">
            BALAMURUGAN C
          </span>{' '}
          • B.TECH AI &amp; DS
        </p>

        {/* Compact Social Icons */}
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              aria-label={label}
              className="group relative w-8 h-8 flex items-center justify-center rounded-lg 
                bg-[#F59E0B]/10 hover:bg-[#F59E0B] 
                border border-[#F59E0B]/25 hover:border-[#F59E0B]
                text-[#F59E0B] hover:text-[#050508] 
                shadow-[0_0_8px_rgba(245,158,11,0.1)] hover:shadow-[0_0_16px_rgba(245,158,11,0.4)]
                hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Icon size={14} className="transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
