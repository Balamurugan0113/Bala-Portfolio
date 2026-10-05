import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ShieldCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO, SERVICES, FAQS } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import SectionHeading from '@/components/ui/SectionHeading';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-[#08080e] border border-white/[0.08] text-white text-sm placeholder-[#475569] ' +
  'focus:outline-none focus:border-[#F59E0B]/60 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.12),0_0_24px_-8px_rgba(245,158,11,0.35)] ' +
  'transition-all duration-300';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (data.success) {
        setFormState({ name: '', email: '', company: '', message: '' });
        toast.success('Message sent successfully! I will get back to you shortly.');
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch {
      toast.error('Could not reach server. Please try again later.');
    }
    setSending(false);
  };

  return (
    <section id="contact" className="relative bg-[#050508] section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Contact section">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#F59E0B]/[0.04] blur-[150px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          index="05"
          label="CONTACT"
          title="Get in Touch"
          subtitle="Send a message to discuss project work, model analysis, or cybersecurity audits."
        />

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            {/* status + contact info */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-[0.16em] font-mono2">
                  {PERSONAL_INFO.availability}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-4">Contact Info</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
                  { icon: Phone, label: 'Phone', value: `+91 ${PERSONAL_INFO.mobile}`, href: `tel:+91${PERSONAL_INFO.mobile}` },
                  { icon: MapPin, label: 'Location', value: `${PERSONAL_INFO.location}, India`, href: undefined },
                ].map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-[#F59E0B]/[0.03] border border-[#F59E0B]/[0.09] hover:border-[#F59E0B]/30 transition-all group/item">
                      <div className="p-2.5 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25 group-hover/item:scale-105 transition-transform">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#94A3B8] uppercase font-semibold tracking-wider">{label}</p>
                        <p className="text-sm font-semibold text-white truncate">{value}</p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={label} href={href} className="block">{inner}</a>
                  ) : (
                    <div key={label}>{inner}</div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-2xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <h3 className="text-sm font-bold text-white mb-4">Services Offered</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((service) => (
                  <div key={service} className="flex items-start gap-2 text-xs text-[#94A3B8] leading-snug">
                    <ShieldCheck size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              className="glass-card rounded-2xl p-6 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                Inquiry Form
                <span className="text-[9px] font-mono2 text-[#94A3B8]/60 border border-white/10 rounded px-1.5 py-0.5">POST /api/contact</span>
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-[#94A3B8]">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className={inputCls}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#94A3B8]">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className={inputCls}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-semibold text-[#94A3B8]">Company (Optional)</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formState.company}
                    onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                    className={inputCls}
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[#94A3B8]">Message Payload *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className={cn(inputCls, 'resize-none')}
                    placeholder="Describe the project scope or details here..."
                  />
                </div>
                <Button type="submit" disabled={sending} className="w-full rounded-2xl" size="lg">
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-[#1A1006]/30 border-t-[#1A1006] animate-spin" />
                      Transmitting Data...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          className="max-w-3xl mx-auto mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="heading-sm text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={cn('glass-card rounded-xl overflow-hidden transition-colors', isOpen && 'border-[#F59E0B]/35')}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-sm font-medium text-white hover:bg-white/[0.03] transition-colors text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={cn('text-[#F59E0B] shrink-0 transition-transform duration-300', isOpen && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-4 text-xs text-[#94A3B8] leading-relaxed">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
