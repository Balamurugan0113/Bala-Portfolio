import { Github, Linkedin, Youtube, Instagram } from 'lucide-react';

const SOCIALS = [
  { icon: Instagram, href: 'https://www.instagram.com/balaa.xx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/@Balsplayzz2005', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/balamurugan-c-5507b82a3', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Balamurugan0113', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-[rgba(79,140,255,0.06)] py-6" role="contentinfo">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,4vw,3rem)] flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[rgba(79,140,255,0.08)] text-[#94A3B8] hover:text-white hover:bg-[#4F8CFF]/20 transition-all duration-200 cursor-pointer"
              aria-label={label}
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="text-xs text-[#94A3B8] text-center leading-relaxed">
          &copy;2026 BALAMURUGAN C PORTFOLIO B.TECH AI &amp; DS
        </p>
      </div>
    </footer>
  );
}
