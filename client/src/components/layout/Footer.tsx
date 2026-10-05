import { Github, Linkedin, Youtube, Instagram } from 'lucide-react';

const SOCIALS = [
  { icon: Instagram, href: 'https://www.instagram.com/balaa.xx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Balamurugan0113', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-[#F59E0B]/10 py-8" role="contentinfo">
      {/* top glow seam */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,4vw,3rem)] flex flex-col items-center gap-5">
        {/* monogram */}
        <div className="flex items-center gap-2.5" aria-hidden="true">
          <img src="/favicon.svg" alt="" className="w-8 h-8 rounded-lg" />
          <span className="font-mono2 text-[11px] font-extrabold text-white tracking-[0.18em]">
            BALAMURUGAN<span className="text-[#F59E0B]">.C</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] text-[#94A3B8] hover:text-[#FBBF24] hover:border-[#F59E0B]/45 hover:bg-[#F59E0B]/10 hover:-translate-y-0.5 transition-all duration-200"
              aria-label={label}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <p className="text-[11px] text-[#94A3B8]/70 text-center leading-relaxed font-mono2 tracking-wide">
          &copy;2026 BALAMURUGAN C — PORTFOLIO · B.TECH AI &amp; DS
        </p>
      </div>
    </footer>
  );
}
