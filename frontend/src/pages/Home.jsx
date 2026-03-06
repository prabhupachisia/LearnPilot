import { SignInButton } from "@clerk/clerk-react";
import { 
  Compass, Zap, Map, ArrowRight, Sparkles, Brain, 
  Target, Star, ChevronRight, Award, Users, BookOpen, Globe
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 overflow-x-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition"></div>
                <Compass size={36} className="relative text-white transform group-hover:rotate-12 transition-transform" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-emerald-200 via-white to-teal-200 bg-clip-text text-transparent">
                LearnPilot AI
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-emerald-400 transition">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-emerald-400 transition">How it Works</a>
            </div>

            <SignInButton mode="modal">
              <button className="group relative px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-7xl mx-auto pt-40 px-6">
        <div className="text-center z-10 relative">
          
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/30 backdrop-blur-sm mb-8">
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-sm text-emerald-100">AI-Powered Learning Paths</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-slate-100">Stop searching.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Start learning.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The abundance of online courses is overwhelming. We use AI to build a structured, personalized learning roadmap from zero to mastery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <SignInButton mode="modal">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <span className="relative z-10 flex items-center gap-2">
                  <Brain size={20} />
                  Build My Learning Path
                  <Zap size={18} className="text-slate-900 group-hover:animate-pulse" />
                </span>
              </button>
            </SignInButton>
            
            <button className="px-8 py-4 bg-slate-900 text-slate-200 rounded-xl text-lg font-semibold border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 group">
              Watch Demo
              <ChevronRight size={18} className="group-hover:translate-x-1 text-emerald-400 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-32 border-t border-b border-slate-800 py-10">
            {[
              { icon: Users, value: '10K+', label: 'Active Learners' },
              { icon: BookOpen, value: '50+', label: 'Learning Paths' },
              { icon: Award, value: '95%', label: 'Success Rate' },
              { icon: Globe, value: '30+', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-3 text-emerald-400" size={28} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-32">
          <FeatureCard
            icon={<Map className="text-emerald-400" size={32} />}
            title="Visual Roadmaps"
            desc="See exactly where you are and what's next with interactive learning paths that adapt to your progress."
          />
          <FeatureCard
            icon={<Brain className="text-teal-400" size={32} />}
            title="AI Curated Content"
            desc="Our AI analyzes thousands of resources to recommend only the best videos, articles, and exercises."
          />
          <FeatureCard
            icon={<Target className="text-cyan-400" size={32} />}
            title="Goal Driven"
            desc="Tell us your dream job or skill, and we'll create a personalized path from zero to mastery."
          />
        </div>

        {/* Final CTA */}
        <div className="relative mb-32">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have already found their perfect learning path with AI.
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-xl text-lg font-bold hover:scale-105 transition-transform shadow-lg inline-flex items-center gap-2 group">
                Get Started Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </SignInButton>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        <p>&copy; 2024 LearnPilot AI. Hackathon Edition.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
      <div className="relative p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 h-full">
        <div className="mb-6 p-3 bg-slate-950 rounded-lg inline-block border border-slate-800 group-hover:border-emerald-500/30">{icon}</div>
        <h3 className="font-bold text-xl text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}