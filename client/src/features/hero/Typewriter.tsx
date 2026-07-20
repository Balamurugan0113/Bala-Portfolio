import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function Typewriter({ texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000 }: TypewriterProps) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
    <span aria-live="polite">
      {text}
      <span className="inline-block w-0.5 h-6 ml-1 bg-[#4F8CFF] align-middle animate-pulse" />
    </span>
  );
}
