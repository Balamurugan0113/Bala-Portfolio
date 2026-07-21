import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO, SERVICES, FAQS } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

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
    <section id="contact" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Contact section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF]">Contact</p>
          <h2 className="heading-lg gradient-primary mt-2">Get in Touch</h2>
          <p className="text-body max-w-2xl mx-auto mt-4">
            Send a message to discuss project work, model analysis, or cybersecurity audits.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3 className="text-sm font-bold text-white mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[rgba(79,140,255,0.03)] border border-[rgba(79,140,255,0.06)]">
                  <div className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase font-semibold">Email</p>
                    <p className="text-sm font-semibold text-white">{PERSONAL_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[rgba(79,140,255,0.03)] border border-[rgba(79,140,255,0.06)]">
                  <div className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase font-semibold">Phone</p>
                    <p className="text-sm font-semibold text-white">+91 {PERSONAL_INFO.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[rgba(79,140,255,0.03)] border border-[rgba(79,140,255,0.06)]">
                  <div className="p-2 rounded-lg bg-[#4F8CFF]/10 text-[#4F8CFF]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase font-semibold">Location</p>
                    <p className="text-sm font-semibold text-white">{PERSONAL_INFO.location}, India</p>
                  </div>
                </div>
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
                  <div key={service} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <ShieldCheck size={14} className="text-[#4F8CFF] shrink-0" />
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
              <h3 className="text-sm font-bold text-white mb-6">Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-[rgba(79,140,255,0.1)] text-white text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#4F8CFF]/40 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#94A3B8]">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-[rgba(79,140,255,0.1)] text-white text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#4F8CFF]/40 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-semibold text-[#94A3B8]">Company (Optional)</label>
                  <input
                    id="company"
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-[rgba(79,140,255,0.1)] text-white text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#4F8CFF]/40 transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[#94A3B8]">Message Payload</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050816] border border-[rgba(79,140,255,0.1)] text-white text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#4F8CFF]/40 transition-colors resize-none"
                    placeholder="Describe the project scope or details here..."
                  />
                </div>
                <Button type="submit" disabled={sending} className="w-full">
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Transmitting Data...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={14} /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="max-w-3xl mx-auto mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="heading-sm text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-white hover:bg-white/5 transition-colors text-left"
                  aria-expanded={openFaq === idx}
                >
                  {faq.question}
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className={`transition-transform duration-300 text-[#94A3B8] ${openFaq === idx ? 'rotate-180' : ''}`}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={cn('transition-all duration-300', openFaq === idx ? 'max-h-80' : 'max-h-0')}>
                  <div className="px-5 pb-4 text-xs text-[#94A3B8] leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
