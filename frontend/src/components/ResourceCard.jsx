import { useState } from 'react';

export default function Home() {
  const [goal, setGoal] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!goal) return;

    setIsGenerating(true);

    // MOCK API CALL: This fakes the AI thinking time for 2 seconds.
    // In step 2, we will route this to your Dashboard page!
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Backend will generate roadmap for: ${goal} at ${skillLevel} level!`);
      // TODO: navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col justify-center items-center p-6 font-sans">
      
      {/* Background Glow Effect (Hackathon Eye-Candy) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center z-10 mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Master Anything with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
            LearnPilot AI
          </span>
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
          Stop getting lost in tutorial hell. Enter your goal, and our AI will build a personalized, step-by-step roadmap with the best curated resources.
        </p>
      </div>

      {/* Input Card */}
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 z-10">
        <form onSubmit={handleGenerate} className="flex flex-col gap-6">
          
          {/* Goal Input */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              What do you want to learn?
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Become a Data Scientist in 6 months"
              className="w-full bg-slate-950 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              required
            />
          </div>

          {/* Skill Level Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Current Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="w-full bg-slate-950 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none transition-colors"
            >
              <option value="Beginner">🌱 Beginner</option>
              <option value="Intermediate">🚀 Intermediate</option>
              <option value="Advanced">⚡ Advanced</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isGenerating || !goal}
            className={`mt-4 w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex justify-center items-center gap-2
              ${isGenerating 
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1'
              }
            `}
          >
            {isGenerating ? (
              <>
                {/* Simple CSS Spinner */}
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                Analyzing Skills...
              </>
            ) : (
              'Generate My Roadmap 🎯'
            )}
          </button>

        </form>
      </div>
      
    </div>
  );
}