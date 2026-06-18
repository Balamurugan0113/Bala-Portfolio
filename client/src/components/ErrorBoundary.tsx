import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e27] p-6 text-primary">
          <div className="max-w-xl text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl md:text-4xl font-display text-destructive mb-4 uppercase tracking-widest">
              SYSTEM CRITICAL EXCEPTION
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-6">
              A fatal error has occurred, destabilizing the client interface session. Core layers have been halted to prevent corruption.
            </p>
            {this.state.error && (
              <pre className="p-4 bg-[#12162a] border border-destructive/50 text-destructive text-left rounded-md max-w-full overflow-x-auto text-xs font-mono mb-8 whitespace-pre-wrap">
                {this.state.error.stack || this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border-2 border-primary bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider hover:bg-transparent hover:text-primary transition-all duration-150 rounded"
            >
              Reboot Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
