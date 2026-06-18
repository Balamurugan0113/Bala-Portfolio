import { Route, Switch } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary relative overflow-hidden">
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow flex flex-col">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={Home} />
            <Route path="/skills" component={Home} />
            <Route path="/projects" component={Home} />
            <Route path="/contact" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Back to Top Button */}
        <BackToTopButton />

        {/* Toast System */}
        <Toaster theme="dark" position="bottom-right" richColors />
      </div>
    </ErrorBoundary>
  );
}
