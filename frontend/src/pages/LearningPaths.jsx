import { useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import {
  Sparkles,
  Plus,
  ArrowRight,
  BookOpen,
  Clock,
  Target,
} from "lucide-react";
import { useState } from "react";

export default function LearningPaths() {
  const navigate = useNavigate();

  // temporary mock paths
  const [paths] = useState([
    {
      id: 1,
      goal: "Become a Data Scientist",
      experience: "Intermediate",
      progress: 35,
      time: "10-15 hrs/week",
    },
    {
      id: 2,
      goal: "Full Stack React Developer",
      experience: "Beginner",
      progress: 10,
      time: "5 hrs/week",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* NAVBAR */}


      {/* CONTENT */}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Your Learning Paths
            </h2>

            <p className="text-slate-400">
              Continue learning or create a new AI roadmap
            </p>
          </div>

          <button
            onClick={() => navigate("/pathbuilder")}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-400 transition"
          >
            <Plus size={18} />
            Create Path
          </button>
        </div>

        {/* PATH GRID */}

        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path) => (
            <div
              key={path.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition cursor-pointer"
              onClick={() =>
                navigate("/dashboard", { state: { goal: path.goal } })
              }
            >
              {/* Goal */}

              <h3 className="text-xl font-bold text-white mb-2">{path.goal}</h3>

              {/* Meta */}

              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  {path.experience}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {path.time}
                </div>
              </div>

              {/* Progress */}

              <div className="mb-3 flex justify-between text-xs text-slate-400 font-semibold">
                <span>Progress</span>
                <span>{path.progress}%</span>
              </div>

              <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: `${path.progress}%` }}
                />
              </div>

              {/* Open Button */}

              <button className="flex items-center gap-2 text-emerald-400 font-semibold group">
                Continue Learning
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </button>
            </div>
          ))}

          {/* CREATE NEW CARD */}

          <div
            onClick={() => navigate("/pathbuilder")}
            className="border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-emerald-500/50 hover:bg-slate-900 transition cursor-pointer"
          >
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 mb-4">
              <Target className="text-emerald-400" size={30} />
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              Create New Learning Path
            </h3>

            <p className="text-slate-400 text-sm max-w-xs">
              Tell AI your goal and generate a personalized roadmap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
