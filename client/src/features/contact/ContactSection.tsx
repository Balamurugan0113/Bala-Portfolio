import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ShieldCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO, SERVICES, FAQS } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { soundFx } from '@/lib/sound';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
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
    <section id="contact" className="relative bg-[#050508] py-14 sm:py-28 px-4 sm:px-6" aria-label="Contact section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <h2 className="heading-lg bg-clip-text text-transparent bg-gradient-to-b from-[#FFFBEB] via-[#F59E0B] to-[#F97316]">
            Get in Touch
          </h2>
          <p className="text-body max-w-2xl mx-auto mt-2 sm:mt-3 text-xs sm:text-sm text-[#94A3B8]">
            Send a message to discuss project collaborations, AI pipelines, or software development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-8">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <motion.div
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">Contact Information</h3>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] shrink-0">
                    <Mail size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-[#94A3B8] uppercase font-semibold">Email</p>
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">{PERSONAL_INFO.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] shrink-0">
                    <Phone size={15} />
                  </div>
                  <div>
                    <p className="text-[9px] text-[#94A3B8] uppercase font-semibold">Phone</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">+91 {PERSONAL_INFO.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <p className="text-[9px] text-[#94A3B8] uppercase font-semibold">Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">{PERSONAL_INFO.location}, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4">Services Offered</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map((service) => (
                  <div key={service} className="flex items-center gap-2 text-[11px] sm:text-xs text-[#94A3B8]">
                    <ShieldCheck size={13} className="text-[#F59E0B] shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5">Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[11px] sm:text-xs font-semibold text-[#94A3B8]">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-xs sm:text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[11px] sm:text-xs font-semibold text-[#94A3B8]">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-xs sm:text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="company" className="text-[11px] sm:text-xs font-semibold text-[#94A3B8]">Organization / College (Optional)</label>
                  <input
                    id="company"
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-xs sm:text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                    placeholder="Company or Institution"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-[11px] sm:text-xs font-semibold text-[#94A3B8]">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#050816] border border-white/10 text-white text-xs sm:text-sm placeholder-[#4A5568] focus:outline-none focus:border-[#F59E0B]/50 transition-colors resize-none"
                    placeholder="Tell me about your project, query, or discussion..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#050508] font-bold rounded-xl py-5 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  <Send size={15} />
                  <span>{sending ? 'Sending...' : 'Send Message'}</span>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQs */}
        <motion.div
          className="mt-10 sm:mt-16 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="heading-sm text-center mb-4 sm:mb-6">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => { soundFx.playClick(); setOpenFaq(openFaq === idx ? null : idx); }}
                  className="w-full flex items-center justify-between px-3.5 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm font-medium text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
                  aria-expanded={openFaq === idx}
                >
                  <span className="pr-2">{faq.question}</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 text-[#F59E0B] shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={cn('transition-all duration-300 overflow-hidden', openFaq === idx ? 'max-h-60' : 'max-h-0')}>
                  <div className="px-3.5 pb-3 sm:px-5 sm:pb-4 text-[11px] sm:text-xs text-[#94A3B8] leading-relaxed border-t border-white/5 pt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
