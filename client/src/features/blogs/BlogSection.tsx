import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { BLOGS, type Blog } from '@shared/const';
import Card3DTilt from '@/components/ui/Card3DTilt';
import { Button } from '@/components/ui/button';
import { soundFx } from '@/lib/sound';

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <section id="blogs" className="relative section-py px-[clamp(1.25rem,4vw,3rem)]" aria-label="Research & Articles">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4F8CFF] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Technical Writings & Papers
          </p>
          <h2 className="heading-lg gradient-primary mt-2">Security & AI Publications</h2>
          <p className="text-body max-w-2xl mx-auto mt-3 text-sm">
            Insights on Adversarial Machine Learning, Network Intrusion Systems, and Production MLOps security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map((blog) => (
            <Card3DTilt
              key={blog.id}
              maxTilt={8}
              onClick={() => {
                soundFx.playModalOpen();
                setSelectedBlog(blog);
              }}
              className="glass-card p-6 border border-[rgba(79,140,255,0.12)] hover:border-[#4F8CFF]/40 cursor-pointer h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00D9FF]/15 text-[#00D9FF] border border-[#00D9FF]/30">
                    {blog.category}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
                    <Clock size={12} /> {blog.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug hover:text-[#4F8CFF] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(79,140,255,0.08)]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {blog.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[rgba(79,140,255,0.08)] text-[#94A3B8]">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#4F8CFF]">
                  <span>Read Article</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-[clamp(0.5rem,2vw,1.5rem)] bg-[#050816]/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedBlog(null); }}
          >
            <motion.div
              className="relative w-full max-w-3xl glass-strong rounded-2xl p-6 sm:p-8 border border-[rgba(79,140,255,0.2)] max-h-[80dvh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 text-[#94A3B8] hover:text-white p-2 hover:bg-white/10 rounded-lg"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono font-bold text-[#4F8CFF] bg-[#4F8CFF]/15 px-3 py-1 rounded-full border border-[#4F8CFF]/30">
                  {selectedBlog.category}
                </span>
                <span className="text-xs text-[#94A3B8] font-mono">• {selectedBlog.date}</span>
                <span className="text-xs text-[#94A3B8] font-mono">• {selectedBlog.readTime} read</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">{selectedBlog.title}</h2>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-medium border-l-2 border-[#4F8CFF] pl-4 italic">
                {selectedBlog.excerpt}
              </p>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
                <p>
                  As machine learning algorithms become critical infrastructure components across automated security defenses, fraud detection engines, and autonomous systems, their vulnerability to targeted adversarial exploits poses a unique architectural threat vector.
                </p>
                <p>
                  In this publication, we outline operational methodologies for conducting adversarial robustness audits across model ingestion pipelines, evaluation metrics for detecting gradient perturbation attacks, and mitigation controls including adversarial retraining and input sanitization layers.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[rgba(79,140,255,0.12)] flex justify-between items-center">
                <div className="flex gap-2">
                  {selectedBlog.tags.map((t) => (
                    <span key={t} className="text-xs text-[#4F8CFF] font-mono">#{t}</span>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedBlog(null)}>
                  Close Article
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
