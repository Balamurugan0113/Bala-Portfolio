import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top with custom duration (slower animation)
  const scrollToTop = () => {
    const currentScroll = window.scrollY;
    const duration = 2000; // 2 seconds for slower scroll
    const startTime = Date.now();

    const scroll = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const position = currentScroll * (1 - easeOutCubic);

      window.scrollTo(0, position);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-40 flex items-center justify-center w-12 h-12",
        "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90",
        "rounded-full shadow-lg hover:shadow-xl",
        "transition-all duration-300 ease-out",
        "transform hover:scale-110 active:scale-95",
        "flex flex-col items-center justify-center gap-0.5",
        "group",
        "border border-primary/30 hover:border-accent/50",
        // Animation classes
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-16 pointer-events-none",
      )}
      style={{
        animation: isVisible
          ? "slide-up-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "none",
      }}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce transition-all" />
      {/* Animated pulsing background effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
    </button>
  );
}
