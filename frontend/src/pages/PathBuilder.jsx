import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Target, Sparkles, ArrowRight, BookOpen, 
  Brain, Zap, Clock, Calendar, Rocket 
} from "lucide-react";

export default function PathBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    experience: "",
    timeCommitment: ""
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else generatePath();
  };

  const generatePath = () => {
    navigate("/dashboard", { state: formData });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans text-slate-200">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">
            <span className={step >= 1 ? "text-emerald-400" : ""}>Goal</span>
            <span className={step >= 2 ? "text-emerald-400" : ""}>Experience</span>
            <span className={step >= 3 ? "text-emerald-400" : ""}>Commitment</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div className={`h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500`} style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {/* Step 1: The Goal */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg"><Target className="text-emerald-400" size={24} /></div>
              <h2 className="text-3xl font-extrabold text-white">What do you want to learn?</h2>
            </div>
            <p className="text-slate-400 mb-8 text-lg">Be specific. Our AI works best when it knows exactly where you want to go.</p>
            
            <input 
              type="text" 
              autoFocus
              placeholder="e.g., Become a Full-Stack React Developer" 
              className="w-full bg-slate-900 border-2 border-slate-700 focus:border-emerald-500 rounded-2xl p-6 text-xl text-white outline-none transition-all shadow-lg focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-8"
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' && formData.goal && handleNext()}
            />
          </div>
        )}

        {/* Step 2: Experience Level */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg"><Brain className="text-emerald-400" size={24} /></div>
              <h2 className="text-3xl font-extrabold text-white">What's your current level?</h2>
            </div>
            <p className="text-slate-400 mb-8 text-lg">We'll skip the basics if you already know them to avoid redundant content.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: "beginner", icon: BookOpen, title: "Beginner", desc: "Starting from scratch" },
                { id: "intermediate", icon: Zap, title: "Intermediate", desc: "I know the basics" },
                { id: "advanced", icon: Rocket, title: "Advanced", desc: "Looking for mastery" }
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => setFormData({...formData, experience: level.id})}
                  className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col gap-3
                    ${formData.experience === level.id 
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}`}
                >
                  <level.icon size={28} className={formData.experience === level.id ? "text-emerald-400" : "text-slate-400"} />
                  <div>
                    <h3 className={`font-bold text-lg ${formData.experience === level.id ? "text-emerald-400" : "text-white"}`}>{level.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{level.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Time Commitment */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg"><Clock className="text-emerald-400" size={24} /></div>
              <h2 className="text-3xl font-extrabold text-white">How much time do you have?</h2>
            </div>
            <p className="text-slate-400 mb-8 text-lg">We'll pace the roadmap based on your weekly availability.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: "casual", icon: Clock, title: "Casual", desc: "2-5 hours / week" },
                { id: "part-time", icon: Calendar, title: "Part-time", desc: "10-15 hours / week" },
                { id: "intensive", icon: Rocket, title: "Intensive", desc: "20+ hours / week" }
              ].map((time) => (
                <button
                  key={time.id}
                  onClick={() => setFormData({...formData, timeCommitment: time.id})}
                  className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col gap-3
                    ${formData.timeCommitment === time.id 
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                      : 'bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}`}
                >
                  <time.icon size={28} className={formData.timeCommitment === time.id ? "text-emerald-400" : "text-slate-400"} />
                  <div>
                    {/* 👇 THIS IS THE FIXED LINE 👇 */}
                    <h3 className={`font-bold text-lg ${formData.timeCommitment === time.id ? "text-emerald-400" : "text-white"}`}>{time.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{time.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-between items-center mt-10">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-white font-medium transition-colors">
              Back
            </button>
          ) : <div></div>}

          <button 
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.goal) || 
              (step === 2 && !formData.experience) || 
              (step === 3 && !formData.timeCommitment)
            }
            className="group px-8 py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            {step === 3 ? (
              <><Sparkles size={20} /> Generate My AI Path</>
            ) : (
              <>Continue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}