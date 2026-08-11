import { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Navbar from '@/components/layout/Navbar';

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
