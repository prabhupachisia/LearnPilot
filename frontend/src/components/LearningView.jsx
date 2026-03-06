import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  PlayCircle,
  FileText,
  Code,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Brain,
  ArrowRight,
  Upload,
  FileBox,
  Trash2,
  Loader2,
  Sparkles,
  Plus,
} from "lucide-react";

export default function LearningView() {
  const { pathId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [pathData, setPathData] = useState(location.state || null);
  const [activeStep, setActiveStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(
    location.state?.completedSteps || [],
  );
  const [materials, setMaterials] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isScouting, setIsScouting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!pathData) {
        try {
          const res = await fetch(
            `http://localhost:8000/learning-path/details/${pathId}`,
          );
          const data = await res.json();
          // Adjust based on your DB column naming (roadmap_data vs roadmap)
          const roadmap = data.roadmap_data || data.roadmap || [];
          setPathData({ ...data, roadmap });
          setActiveStep(roadmap[0]);
          setCompletedSteps(data.completed_steps || []);
        } catch (err) {
          console.error("Failed to fetch path details", err);
        }
      } else if (pathData.roadmap && !activeStep) {
        setActiveStep(pathData.roadmap[0]);
      }
    };
    loadData();
  }, [pathId, pathData]);

  const scoutForResources = async () => {
    if (!activeStep) return;
    setIsScouting(true);

    try {
      const response = await fetch(
        "http://localhost:8000/learning-path/fetch-resources",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stepTitle: activeStep.title,
            goal: pathData.goal,
            style: pathData.learning_style || "balanced",
          }),
        },
      );

      const data = await response.json();

      if (data.resources && data.resources.length > 0) {
        // 1. Create the updated step object
        const updatedStep = {
          ...activeStep,
          resources: [...activeStep.resources, ...data.resources],
        };

        // 2. Update active view immediately
        setActiveStep(updatedStep);

        // 3. Sync with the main pathData roadmap so it persists during step switches
        setPathData((prev) => ({
          ...prev,
          roadmap: prev.roadmap.map((s) =>
            s.id === activeStep.id ? updatedStep : s,
          ),
        }));

        // 4. (Hackathon Bonus) Persistence: Save new roadmap to Supabase
        await fetch(`http://localhost:8000/learning-path/update-roadmap`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pathId: pathId,
            roadmap: pathData.roadmap.map((s) =>
              s.id === activeStep.id ? updatedStep : s,
            ),
          }),
        });
      }
    } catch (error) {
      console.error("Scouting failed:", error);
    } finally {
      setIsScouting(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;
    setIsUploading(true);
    setTimeout(() => {
      setMaterials([
        ...materials,
        {
          id: Date.now(),
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        },
      ]);
      setIsUploading(false);
    }, 1500);
  };

  if (!activeStep)
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-slate-500 font-mono">
        INITIALIZING WORKSPACE...
      </div>
    );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-950 overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/20 flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/40">
          <button
            onClick={() => navigate("/learning-paths")}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">
              Current Goal
            </p>
            <h2 className="font-bold text-sm text-white truncate uppercase">
              {pathData?.goal}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
          <section>
            <h3 className="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Curriculum
            </h3>
            <div className="space-y-1">
              {pathData.roadmap?.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                    activeStep.id === step.id
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "hover:bg-slate-800/50"
                  }`}
                >
                  <div className="mt-1">
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-700" />
                    )}
                  </div>
                  <p
                    className={`text-sm font-bold ${activeStep.id === step.id ? "text-white" : "text-slate-400"}`}
                  >
                    {idx + 1}. {step.title}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between items-center">
              <span>Study Vault</span>
              <FileBox size={14} />
            </div>
            <div className="space-y-2 mt-2 px-1">
              {materials.map((file) => (
                <div
                  key={file.id}
                  className="group flex items-center justify-between p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText size={14} className="text-emerald-400 shrink-0" />
                    <p className="text-[11px] text-slate-300 truncate">
                      {file.name}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full py-3 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center gap-1 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-slate-500"
              >
                {isUploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                <span className="text-[9px] font-black uppercase tracking-widest">
                  Add Material
                </span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={handleFileUpload}
              />
            </div>
          </section>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar relative">
        <div className="p-8 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                Active Milestone
              </span>
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">
                {activeStep.title}
              </h1>
              <p className="text-slate-400 italic text-sm max-w-2xl">
                {activeStep.description}
              </p>
            </div>
            <button className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">
              MARK AS COMPLETED
            </button>
          </div>
        </div>

        <div className="p-10 max-w-5xl mx-auto space-y-12">
          {/* RESOURCES SECTION */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-400" /> Curated
                Resources
              </h2>
              <button
                onClick={scoutForResources}
                disabled={isScouting}
                className="text-[10px] font-black text-slate-500 hover:text-emerald-400 uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 transition-all"
              >
                {isScouting ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Plus size={12} />
                )}
                {isScouting ? "Searching Web..." : "Scout More"}
              </button>
            </div>

            {activeStep.resources?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeStep.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800 transition-all shadow-xl"
                  >
                    <div className="flex justify-between mb-4">
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                        {res.type === "video" ? (
                          <PlayCircle className="text-red-400" size={20} />
                        ) : (
                          <FileText className="text-blue-400" size={20} />
                        )}
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-slate-600 group-hover:text-emerald-400 transition-colors"
                      />
                    </div>
                    <h3 className="text-white font-bold group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {res.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 uppercase font-black mt-1 tracking-widest">
                      {res.source}
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-900 rounded-[2rem] bg-slate-900/10">
                <Plus size={32} className="text-slate-700 mb-4" />
                <p className="text-slate-500 text-sm italic mb-6">
                  No links found. Let AI find the best materials for you.
                </p>
                <button
                  onClick={scoutForResources}
                  className="px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  Find Tutorials
                </button>
              </div>
            )}
          </section>

          {/* AI INTERACTIVE TUTOR CARD */}
          <section className="relative group p-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-[2.5rem]">
            <div className="bg-slate-950 p-10 rounded-[2.4rem] border border-white/5">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="shrink-0 p-6 bg-emerald-500 text-slate-950 rounded-[2rem] shadow-2xl shadow-emerald-500/20 rotate-2">
                  <Brain size={48} />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    AI Study Room
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Ready to dive deep? Enter the study room to chat with AI
                    about{" "}
                    <span className="text-white font-bold">
                      {activeStep.title}
                    </span>{" "}
                    using these resources and your vault.
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/study-room/${pathId}`, {
                        state: {
                          roadmap: pathData.roadmap,
                          materials,
                          goal: pathData.goal,
                        },
                      })
                    }
                    className="px-8 py-3.5 bg-emerald-500 text-slate-950 rounded-2xl font-black text-sm hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Open Study Room <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
