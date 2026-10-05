import { motion } from 'framer-motion';

interface SectionHeadingProps {
  index: string;      // e.g. "01"
  label: string;      // e.g. "ABOUT"
  title: string;      // display heading
  subtitle?: string;
  align?: 'center' | 'left';
}

/**
 * Consistent section header: mono eyebrow with index, display heading, subtitle.
 */
export default function SectionHeading({ index, label, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <motion.div
      className={`mb-12 sm:mb-16 ${centered ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#F59E0B]/60" aria-hidden="true" />
        <span className="eyebrow">
          [ {index} <span className="text-[#94A3B8]">//</span> {label} ]
        </span>
        <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#F59E0B]/60" aria-hidden="true" />
      </div>
      <h2 className="heading-lg gradient-hero mt-4 text-balance">{title}</h2>
      {subtitle && (
        <p className={`text-body mt-4 text-sm sm:text-base text-[#94A3B8] ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
