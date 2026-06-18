import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Terminal, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center font-mono z-10 relative">
      <div className="relative mb-6 select-none">
        <div className="text-8xl md:text-9xl font-display font-bold text-destructive animate-glitch opacity-35">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldAlert className="h-16 w-16 text-destructive" />
        </div>
      </div>
      
      <h1 className="text-xl md:text-2xl font-display font-bold uppercase tracking-widest text-white mb-4">
        ACCESS VIOLATION // PATH NOT FOUND
      </h1>
      
      <p className="max-w-md text-xs sm:text-sm font-body text-muted-foreground/75 mb-8 leading-relaxed">
        The requested terminal sector does not exist or has been isolated behind an encryption firewall. Verify routing coordinates.
      </p>

      <div className="flex items-center space-x-2 border border-primary/25 bg-card/60 px-4 py-2.5 rounded-md mb-8 text-[10px] select-all">
        <Terminal className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-primary-foreground font-bold bg-primary px-1 mr-1 rounded">SYS_LOG</span>
        <span>ERR_SECTOR_NOT_RESOLVED // IP: 127.0.0.1</span>
      </div>

      <Link href="/">
        <Button variant="default" size="default">
          Return to HOME
        </Button>
      </Link>
    </div>
  );
}
