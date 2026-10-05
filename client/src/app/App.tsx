import { lazy, Suspense, useState } from 'react';
import { Route, Switch } from 'wouter';
import { MotionConfig } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import BackgroundFX from '@/app/BackgroundFX';
import LoadingScreen from '@/components/LoadingScreen';
import { BootContext } from '@/app/BootContext';

import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import { Toaster } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

const HeroSection = lazy(() => import('@/features/hero/HeroSection').then(m => ({ default: m.default })));
const AboutSection = lazy(() => import('@/features/about/AboutSection').then(m => ({ default: m.default })));
const SkillsSection = lazy(() => import('@/features/skills/SkillsSection').then(m => ({ default: m.default })));
const ProjectsSection = lazy(() => import('@/features/projects/ProjectsSection').then(m => ({ default: m.default })));
const ExperienceSection = lazy(() => import('@/features/experience/ExperienceSection').then(m => ({ default: m.default })));
const ContactSection = lazy(() => import('@/features/contact/ContactSection').then(m => ({ default: m.default })));

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black gradient-primary mb-4 font-display">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-[#94A3B8] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-b from-[#FBBF24] to-[#EA580C] text-[#1A1006] font-semibold hover:shadow-[0_8px_30px_-6px_rgba(245,158,11,0.55)] transition-shadow"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-[#F59E0B]/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F59E0B] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#050508]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <ErrorBoundary>
      <BootContext.Provider value={booted}>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen flex-col bg-[#050508] text-white selection:bg-[#F59E0B]/30 selection:text-white relative overflow-x-clip">
          {!booted && <LoadingScreen onComplete={() => setBooted(true)} />}
          <BackgroundFX />
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main className="flex-grow flex flex-col relative z-10">
            <Suspense fallback={<LoadingFallback />}>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </main>
          <Footer />
          <BackToTop />
          <Toaster theme="dark" position="bottom-right" richColors />
        </div>
      </MotionConfig>
      </BootContext.Provider>
    </ErrorBoundary>
  );
}
