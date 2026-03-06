import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Sparkles,
  Plus,
  ArrowRight,
  BookOpen,
  Clock,
  Target,
  Loader2,
  Layers,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LearningPaths() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      if (!user) return;
      try {
        const response = await fetch(
          `http://localhost:8000/learning-path/user/${user.id}`,
        );
        const data = await response.json();
        setPaths(data);
      } catch (error) {
        console.error("Error fetching paths:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, [user]);

  const calculateProgress = (path) => {
    if (!path.roadmap_data || path.roadmap_data.length === 0) return 0;
    const total = path.roadmap_data.length;
    const completed = path.completed_steps?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const handleContinue = (path) => {
    // Navigate to the dedicated workspace view
    navigate(`/learning-view/${path.id}`, {
      state: {
        roadmap: path.roadmap_data,
        goal: path.goal,
        pathId: path.id,
        completedSteps: path.completed_steps || [],
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
              My Learning Library
            </h2>
            <p className="text-slate-400">
              Manage your AI-generated curricula and track your mastery.
            </p>
          </div>

          <button
            onClick={() => navigate("/pathbuilder")}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus size={18} />
            Generate New Path
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-900/20 border border-slate-800/50 rounded-3xl">
            <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
            <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">
              Syncing with Supabase...
            </p>
          </div>
        ) : paths.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl">
            <div className="p-6 bg-slate-900 rounded-2xl mb-6">
              <Layers size={48} className="text-slate-700" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No paths found
            </h3>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              You haven't generated any learning paths yet. Tell our AI what
              skill you want to master to get started.
            </p>
            <button
              onClick={() => navigate("/pathbuilder")}
              className="px-8 py-4 bg-slate-100 text-slate-950 rounded-xl font-bold hover:bg-white transition-all flex items-center gap-2"
            >
              Start Your First Journey <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {paths.map((path) => {
              const progress = calculateProgress(path);
              return (
                <div
                  key={path.id}
                  onClick={() => handleContinue(path)}
                  className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/40 transition-all cursor-pointer overflow-hidden shadow-xl"
                >
                  {/* Decorative Sparkle */}
                  <div className="absolute -top-4 -right-4 p-8 opacity-0 group-hover:opacity-10 transition-opacity rotate-12">
                    <Sparkles size={80} className="text-emerald-500" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors leading-tight">
                        {path.goal}
                      </h3>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
                        Active
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                      <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
                        <BookOpen size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-300">
                          {path.experience_level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800">
                        <Clock size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-300">
                          {path.time_commitment}
                        </span>
                      </div>
                    </div>

                    {/* Progress Visual */}
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Mastery Level</span>
                        <span className="text-emerald-400">{progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-emerald-400 font-black text-sm group-hover:gap-3 transition-all">
                        ENTER WORKSPACE <ArrowRight size={18} />
                      </span>
                      <span className="text-[10px] font-mono text-slate-600">
                        ID: {path.id.split("-")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
