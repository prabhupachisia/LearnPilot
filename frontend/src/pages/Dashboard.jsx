import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  PlaySquare,
  BookOpen,
  ExternalLink,
  Code,
  BrainCircuit,
  Sparkles,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const MOCK_ROADMAP = [
  {
    id: "step_1",
    title: "Python Fundamentals",
    description:
      "Master the basics of Python including variables, loops, functions, and object-oriented programming concepts.",
    resources: [
      {
        type: "video",
        title: "Python for Beginners - Full Course",
        source: "YouTube",
        url: "#",
      },
      {
        type: "doc",
        title: "Official Python Documentation",
        source: "Python.org",
        url: "#",
      },
      {
        type: "practice",
        title: "Interactive Python Variables",
        source: "LeetCode",
        url: "#",
      },
    ],
  },
  {
    id: "step_2",
    title: "Data Manipulation (Pandas & NumPy)",
    description:
      "Learn how to clean, analyze, and manipulate large datasets using industry-standard libraries.",
    resources: [
      {
        type: "video",
        title: "Pandas Data Science Tutorial",
        source: "YouTube",
        url: "#",
      },
      {
        type: "doc",
        title: "Kaggle Pandas Micro-course",
        source: "Kaggle",
        url: "#",
      },
    ],
  },
  {
    id: "step_3",
    title: "Machine Learning Basics",
    description:
      "Understand supervised vs unsupervised learning, and build your first models using Scikit-Learn.",
    resources: [
      {
        type: "video",
        title: "StatQuest: Machine Learning Intro",
        source: "YouTube",
        url: "#",
      },
      {
        type: "doc",
        title: "Scikit-Learn Crash Course",
        source: "Towards Data Science",
        url: "#",
      },
    ],
  },
];

export default function Dashboard() {
  const location = useLocation();
  const userGoal = location.state?.goal || "Become a Data Scientist";

  const [isGenerating, setIsGenerating] = useState(true);
  const [activeNode, setActiveNode] = useState(MOCK_ROADMAP[0]);
  const [completedNodes, setCompletedNodes] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const progress = Math.round(
    (completedNodes.length / MOCK_ROADMAP.length) * 100,
  );

  const toggleComplete = (id) => {
    setCompletedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return <PlaySquare className="text-red-400" size={18} />;
      case "doc":
        return <BookOpen className="text-blue-400" size={18} />;
      case "practice":
        return <Code className="text-emerald-400" size={18} />;
      default:
        return <ExternalLink className="text-slate-400" size={18} />;
    }
  };

  if (isGenerating) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-slate-950">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
          <BrainCircuit
            size={64}
            className="text-emerald-500 animate-pulse relative z-10 mb-6"
          />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Architecting your path...
        </h2>
        <p className="text-slate-500 font-mono text-sm">Target: {userGoal}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-950">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-80 flex-col border-r border-slate-800 bg-slate-900/20 backdrop-blur-sm">
        <div className="p-6 border-b border-slate-800">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Progress
            </span>
            <span className="text-emerald-400 font-mono text-sm">
              {progress}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {MOCK_ROADMAP.map((node, index) => {
            const isActive = activeNode.id === node.id;
            const isDone = completedNodes.includes(node.id);
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`w-full flex items-start gap-4 px-6 py-4 transition-all border-l-2 ${
                  isActive
                    ? "bg-emerald-500/5 border-emerald-500"
                    : "border-transparent hover:bg-slate-800/50"
                }`}
              >
                <div
                  className={`mt-1 shrink-0 ${isDone ? "text-emerald-500" : isActive ? "text-emerald-400" : "text-slate-600"}`}
                >
                  {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </div>
                <div className="text-left">
                  <p
                    className={`text-xs font-bold mb-0.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`}
                  >
                    STAGE {index + 1}
                  </p>
                  <p
                    className={`text-sm font-semibold leading-tight ${isActive ? "text-white" : "text-slate-400"}`}
                  >
                    {node.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Sparkles size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                  Current Milestone
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                {activeNode.title}
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl italic">
                "{activeNode.description}"
              </p>
            </div>

            <button
              onClick={() => toggleComplete(activeNode.id)}
              className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                completedNodes.includes(activeNode.id)
                  ? "bg-slate-900 text-emerald-500 border border-emerald-500/30"
                  : "bg-emerald-500 text-slate-950 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              }`}
            >
              {completedNodes.includes(activeNode.id) ? (
                <>
                  {" "}
                  <CheckCircle2 size={20} /> Milestone Completed{" "}
                </>
              ) : (
                <>
                  {" "}
                  Complete Step <ChevronRight size={20} />{" "}
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {activeNode.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                className="group p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all"
              >
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-slate-950 rounded-lg group-hover:scale-110 transition-transform">
                    {getResourceIcon(res.type)}
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-slate-600 group-hover:text-emerald-400"
                  />
                </div>
                <h3 className="text-white font-bold group-hover:text-emerald-400 transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">
                  {res.source}
                </p>
              </a>
            ))}
          </div>

          {/* AI CHAT FOOTER */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-emerald-500/10 rotate-12">
              <MessageSquare size={160} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <BrainCircuit className="text-emerald-400" size={24} />
                Stuck? Ask your Mentor.
              </h3>
              <p className="text-slate-400 mb-6 text-sm">
                Get instant code snippets or simplified explanations for{" "}
                {activeNode.title}.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                  Ask
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
