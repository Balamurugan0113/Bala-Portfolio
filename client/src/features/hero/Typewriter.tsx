import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function Typewriter({ texts, typingSpeed = 70, deletingSpeed = 35, pauseTime = 2200 }: TypewriterProps) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Reduced motion: show the first role statically, no cycling
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(texts[0] ?? '');
      return;
    }
  }, [texts]);

  useEffect(() => {
    const current = texts[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % texts.length);
    } else {
      timeout = setTimeout(
        () => setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, wordIdx, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span aria-live="polite" className="font-mono2">
      <span className="text-[#F59E0B]/70 mr-1">&gt;</span>
      {text}
      <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-[#F59E0B] align-middle animate-pulse" />
    </span>
  );
}
