import { SignInButton } from "@clerk/clerk-react";
import { Compass, Zap, Map } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Compass size={32} />
          <span>PathNavigator AI</span>
        </div>
        <SignInButton mode="modal">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Sign In
          </button>
        </SignInButton>
      </nav>

      <main className="max-w-4xl mx-auto text-center mt-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Stop searching. <span className="text-blue-600">Start learning.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          The abundance of online courses is overwhelming. We use AI to build a
          structured, personalized learning roadmap from zero to mastery in any
          field.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignInButton mode="modal">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-xl text-lg font-semibold hover:scale-105 transition shadow-lg flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              Build My Learning Path
            </button>
          </SignInButton>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
          <FeatureCard
            icon={<Map className="text-blue-500" />}
            title="Visual Roadmaps"
            desc="See exactly where you are and what's next."
          />
          <FeatureCard
            icon={<Zap className="text-yellow-500" />}
            title="AI Curated"
            desc="Only the best videos and docs, no fluff."
          />
          <FeatureCard
            icon={<Compass className="text-green-500" />}
            title="Goal Driven"
            desc="Tell us your dream job, we find the path."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  );
}
