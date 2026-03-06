import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Sparkles,
  ArrowRight,
  BookOpen,
  Brain,
  Zap,
  Clock,
  Rocket,
  Laptop,
  Video,
  GraduationCap,
} from "lucide-react";

import { useUser } from "@clerk/clerk-react";

export default function PathBuilder() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    experience: "beginner",
    timeCommitment: "part-time",
    style: "visual",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please sign in to create a path");

    setLoading(true);
    console.log("🚀 Starting AI Generation & Database Save...");

    const payload = {
      goal: formData.goal,
      experience: formData.experience,
      timeCommitment: formData.timeCommitment,
      style: formData.style,
      userId: user.id, // Linking to the Clerk User ID
    };

    try {
      // 1. Call your FastAPI backend
      // PathBuilder.jsx
      const response = await fetch(
        "http://127.0.0.1:8000/learning-path/generate",
        {
          // Use 127.0.0.1 for stability
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to generate learning path");
      }

      const savedPath = await response.json();

      console.log("✅ Path saved in DB successfully:", savedPath);

      // 2. Navigate to dashboard with the REAL data from the DB
      navigate("/dashboard", {
        state: {
          roadmap: savedPath.roadmap_data,
          goal: savedPath.goal,
          pathId: savedPath.id,
        },
      });
    } catch (error) {
      console.error("❌ Error during generation:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SelectionCard = ({ icon: Icon, title, id, category, current }) => (
    <button
      type="button"
      onClick={() => setFormData({ ...formData, [category]: id })}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
        current === id
          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
      }`}
    >
      <Icon size={20} />
      <span className="text-xs font-bold uppercase tracking-tighter">
        {title}
      </span>
    </button>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 blur-[120px] rounded-full" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-3xl relative z-10 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            Configure Your Journey
          </h1>
          <p className="text-slate-400">
            Our AI will architect a custom roadmap based on your profile.
          </p>
        </div>

        <div className="space-y-10">
          {/* Section 1: Goal */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
              <Target size={18} /> What is your primary goal?
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Master Machine Learning with PyTorch"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-xl text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Section 2: Experience */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
                <Brain size={18} /> Experience Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                <SelectionCard
                  icon={BookOpen}
                  title="Newbie"
                  id="beginner"
                  category="experience"
                  current={formData.experience}
                />
                <SelectionCard
                  icon={Zap}
                  title="Familiar"
                  id="intermediate"
                  category="experience"
                  current={formData.experience}
                />
                <SelectionCard
                  icon={Rocket}
                  title="Pro"
                  id="advanced"
                  category="experience"
                  current={formData.experience}
                />
              </div>
            </div>

            {/* Section 3: Time */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
                <Clock size={18} /> Weekly Commitment
              </label>
              <div className="grid grid-cols-3 gap-3">
                <SelectionCard
                  icon={Clock}
                  title="Light"
                  id="casual"
                  category="timeCommitment"
                  current={formData.timeCommitment}
                />
                <SelectionCard
                  icon={Laptop}
                  title="Steady"
                  id="part-time"
                  category="timeCommitment"
                  current={formData.timeCommitment}
                />
                <SelectionCard
                  icon={Rocket}
                  title="Full"
                  id="intensive"
                  category="timeCommitment"
                  current={formData.timeCommitment}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Learning Style */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest">
              <GraduationCap size={18} /> Preferred Learning Style
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "visual", icon: Video, label: "Video First" },
                { id: "reading", icon: BookOpen, label: "Docs/Articles" },
                { id: "hands-on", icon: Code, label: "Projects" },
                { id: "balanced", icon: Sparkles, label: "AI Mix" },
              ].map((style) => (
                <SelectionCard
                  key={style.id}
                  icon={style.icon}
                  title={style.label}
                  id={style.id}
                  category="style"
                  current={formData.style}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.goal || loading}
            className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black text-xl rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/10"
          >
            {loading ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Sparkles className="animate-spin" /> Analyzing Requirements...
              </span>
            ) : (
              <>
                {" "}
                Launch My Path <ArrowRight />{" "}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Simple internal Code icon since lucide-react was already imported
function Code({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
