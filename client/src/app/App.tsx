import { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Navbar from '@/components/layout/Navbar';

import GhostCursor from '@/components/effects/GhostCursor';
import Particles from '@/components/effects/Particles';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import { Toaster } from 'sonner';
import { useReducedMotion } from '@/hooks/useReducedMotion';
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
        <div className="text-8xl font-bold gradient-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-[#94A3B8] mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F8CFF] text-white rounded-xl font-semibold hover:bg-[#3B7BE8] transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-[#4F8CFF] border-t-transparent animate-spin" />
    </div>
  );
}

function HomePage() {
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#050508]">
      {!reduced && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["rgb(245,158,11)", "rgb(249,115,22)", "rgb(234,179,8)"]}
            particleCount={300}
            particleSpread={15}
            speed={0.04}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            sizeRandomness={1.5}
            cameraDistance={25}
            pixelRatio={0.5}
          />
        </div>
      )}
      <div className="noise-overlay pointer-events-none" />
      {!reduced && isDesktop && (
        <GhostCursor color="rgb(245,158,11)" brightness={1.2} trailLength={40} inertia={0.4} bloomStrength={0.15} />
      )}
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
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen flex-col bg-[#050508] text-white selection:bg-[#F59E0B]/30 selection:text-white relative overflow-x-hidden">
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
    </ErrorBoundary>
  );
}
