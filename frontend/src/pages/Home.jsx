import { SignInButton, useUser } from "@clerk/clerk-react";
import {
  Compass,
  Zap,
  Map,
  ArrowRight,
  Sparkles,
  Brain,
  Target,
  ChevronRight,
  Award,
  Users,
  BookOpen,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full blur-[100px] opacity-10"></div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Compass size={34} className="text-emerald-400" />
            <span className="font-bold text-2xl text-white">LearnPilot AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-400 hover:text-emerald-400"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-400 hover:text-emerald-400"
            >
              How it Works
            </a>
          </div>

          <SignInButton
            mode="modal"
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
          >
            <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold hover:scale-105 transition">
              Get Started
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO */}
      <main className="relative max-w-7xl mx-auto pt-40 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/30 mb-8">
          <Sparkles size={16} className="text-emerald-400" />
          <span className="text-sm text-emerald-200">
            AI-Powered Learning Paths
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Stop searching.
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Start learning.
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
          AI builds your personalized roadmap from beginner to expert.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <SignInButton
            mode="modal"
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-105 transition">
              <Brain size={20} />
              Build My Learning Path
              <Zap size={18} />
            </button>
          </SignInButton>

          <button className="px-8 py-4 bg-slate-900 border border-slate-700 rounded-xl text-lg flex items-center gap-2 hover:border-emerald-500">
            Watch Demo
            <ChevronRight size={18} />
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-32 border-y border-slate-800 py-10">
          {[
            { icon: Users, value: "10K+", label: "Active Learners" },
            { icon: BookOpen, value: "50+", label: "Learning Paths" },
            { icon: Award, value: "95%", label: "Success Rate" },
            { icon: Globe, value: "30+", label: "Countries" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="mx-auto mb-3 text-emerald-400" size={28} />
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-32">
          <FeatureCard
            icon={<Map className="text-emerald-400" size={32} />}
            title="Visual Roadmaps"
            desc="Interactive learning paths showing exactly what to learn next."
          />

          <FeatureCard
            icon={<Brain className="text-teal-400" size={32} />}
            title="AI Curated Content"
            desc="AI selects the best resources from thousands of courses."
          />

          <FeatureCard
            icon={<Target className="text-cyan-400" size={32} />}
            title="Goal Driven"
            desc="Tell us your goal and get a personalized roadmap."
          />
        </div>

        {/* FINAL CTA */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center mb-32">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>

          <p className="text-slate-400 mb-8">
            Join thousands of learners building their AI-powered roadmap.
          </p>

          <SignInButton
            mode="modal"
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
          >
            <button className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto hover:scale-105 transition">
              Get Started Now
              <ArrowRight size={18} />
            </button>
          </SignInButton>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        © 2024 LearnPilot AI
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition">
      <div className="mb-6 p-3 bg-slate-950 rounded-lg inline-block">
        {icon}
      </div>

      <h3 className="font-bold text-xl text-white mb-3">{title}</h3>

      <p className="text-slate-400">{desc}</p>
    </div>
  );
}
