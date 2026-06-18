export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-card/50 py-10 text-xs font-sans relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Affiliation / Course info */}
        <div className="flex items-center space-x-2.5 text-muted-foreground font-medium text-center md:text-left">
          <span>B.Tech in Artificial Intelligence & Data Science</span>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-muted-foreground/60 font-medium">
          &copy; {currentYear} Balamurugan C. All rights reserved.
        </div>

        {/* Right Side: Professional Links */}
        <div className="flex space-x-6 text-muted-foreground font-semibold">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
