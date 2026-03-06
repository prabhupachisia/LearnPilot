import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { 
  CheckCircle2, Circle, PlaySquare, BookOpen, 
  ExternalLink, Code, BrainCircuit, Sparkles, MessageSquare, Brain,
  Compass, LayoutDashboard
} from "lucide-react";

// 🛑 MOCK DATA: Your backend teammate will replace this with their API response!
const MOCK_ROADMAP = [
  {
    id: "step_1",
    title: "Python Fundamentals",
    description: "Master the basics of Python including variables, loops, functions, and object-oriented programming concepts.",
    resources: [
      { type: "video", title: "Python for Beginners - Full Course", source: "YouTube", url: "#" },
      { type: "doc", title: "Official Python Documentation", source: "Python.org", url: "#" },
      { type: "practice", title: "Interactive Python Variables", source: "LeetCode", url: "#" }
    ]
  },
  {
    id: "step_2",
    title: "Data Manipulation (Pandas & NumPy)",
    description: "Learn how to clean, analyze, and manipulate large datasets using industry-standard libraries.",
    resources: [
      { type: "video", title: "Pandas Data Science Tutorial", source: "YouTube", url: "#" },
      { type: "doc", title: "Kaggle Pandas Micro-course", source: "Kaggle", url: "#" }
    ]
  },
  {
    id: "step_3",
    title: "Machine Learning Basics",
    description: "Understand supervised vs unsupervised learning, and build your first models using Scikit-Learn.",
    resources: [
      { type: "video", title: "StatQuest: Machine Learning Intro", source: "YouTube", url: "#" },
      { type: "doc", title: "Scikit-Learn Crash Course", source: "Towards Data Science", url: "#" },
      { type: "practice", title: "Titanic Dataset Prediction", source: "Kaggle", url: "#" }
    ]
  },
  {
    id: "step_4",
    title: "Deep Learning & Neural Networks",
    description: "Dive deep into neural networks, backpropagation, and build models using PyTorch or TensorFlow.",
    resources: [
      { type: "video", title: "Neural Networks from Scratch", source: "YouTube", url: "#" },
      { type: "doc", title: "PyTorch 60-Minute Blitz", source: "PyTorch", url: "#" }
    ]
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userGoal = location.state?.goal || "Become a Data Scientist";
  
  const [isGenerating, setIsGenerating] = useState(true);
  const [activeNode, setActiveNode] = useState(MOCK_ROADMAP[0]);
  const [completedNodes, setCompletedNodes] = useState([]);

  // AI Generation Simulation Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const progress = Math.round((completedNodes.length / MOCK_ROADMAP.length) * 100);

  const toggleComplete = (id) => {
    setCompletedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return <PlaySquare className="text-red-400" size={20} />;
      case 'doc': return <BookOpen className="text-blue-400" size={20} />;
      case 'practice': return <Code className="text-emerald-400" size={20} />;
      default: return <ExternalLink className="text-slate-400" size={20} />;
    }
  };

  // ----------------------------------------------------------------
  // LOADING STATE (Shows while "AI" is building the path)
  // ----------------------------------------------------------------
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <BrainCircuit size={64} className="text-emerald-500 animate-pulse mb-6" />
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
          AI is mapping your journey...
        </h2>
        <p className="text-slate-400">Analyzing skills for: "{userGoal}"</p>
        
        {/* Fake Terminal Loading Steps */}
        <div className="mt-8 w-80 bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm text-emerald-400/70">
          <p className="animate-pulse">{`> Extracting required skills...`}</p>
          <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>{`> Curating top resources...`}</p>
          <p className="animate-pulse" style={{ animationDelay: '1s' }}>{`> Building timeline nodes...`}</p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // MAIN DASHBOARD
  // ----------------------------------------------------------------
  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex flex-col overflow-hidden font-sans">
      
      {/* 1. TOP NAVBAR */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-10 shadow-md">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
            <Sparkles size={20} className="text-slate-950" />
          </div>
          <h1 className="font-bold text-xl text-slate-100 hidden sm:block">LearnPilot</h1>
        </div>

        {/* Progress Bar in Nav */}
        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
            <span className="truncate pr-4">Goal: {userGoal}</span>
            <span className="text-emerald-400 whitespace-nowrap">{progress}% Completed</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 mr-6">
          <button className="flex items-center gap-2 text-emerald-400 font-bold">
            <LayoutDashboard size={18} /> My Path
          </button>
          <button 
            onClick={() => navigate("/explore")}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-medium"
          >
            <Compass size={18} /> Explore
          </button>
        </nav>

        <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-9 h-9 border-2 border-slate-700 hover:border-emerald-500 transition-colors" } }} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. LEFT SIDEBAR: Visual Timeline */}
        <aside className="w-full md:w-80 lg:w-96 bg-slate-900/50 border-r border-slate-800 overflow-y-auto flex-shrink-0">
          <div className="p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Your Roadmap</h2>
            
            <div className="relative border-l-2 border-slate-800 ml-3 space-y-8 pb-10">
              {MOCK_ROADMAP.map((node, index) => {
                const isCompleted = completedNodes.includes(node.id);
                const isActive = activeNode.id === node.id;

                return (
                  <div 
                    key={node.id} 
                    onClick={() => setActiveNode(node)}
                    className="relative pl-8 cursor-pointer group"
                  >
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-[11px] top-1 rounded-full border-4 transition-all duration-300
                      ${isCompleted ? 'bg-emerald-500 border-emerald-500 w-5 h-5' : 
                        isActive ? 'bg-slate-950 border-emerald-400 w-5 h-5 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 
                        'bg-slate-950 border-slate-700 w-5 h-5 group-hover:border-slate-500'}
                    `}></div>
                    
                    <div className={`transition-all duration-200 ${isActive ? 'translate-x-1' : ''}`}>
                      <h3 className={`font-semibold text-lg leading-tight mb-1
                        ${isActive ? 'text-emerald-400' : isCompleted ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-slate-100'}
                      `}>
                        {index + 1}. {node.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${isActive ? 'text-slate-400' : 'text-slate-600'}`}>
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* 3. RIGHT MAIN CONTENT: Active Topic & Resources */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-6 md:p-10 relative">
          
          <div className="max-w-3xl mx-auto pb-20">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                  Current Focus
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  {activeNode.title}
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  {activeNode.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate("/quiz")}
                  className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-purple-600 text-white hover:bg-purple-500 shadow-lg hover:shadow-purple-500/20"
                >
                  <Brain size={20} /> Test Knowledge
                </button>

                <button 
                  onClick={() => toggleComplete(activeNode.id)}
                  className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300
                    ${completedNodes.includes(activeNode.id) 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30' 
                      : 'bg-slate-800 text-white hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-emerald-500/20'}
                  `}
                >
                  {completedNodes.includes(activeNode.id) ? (
                    <><CheckCircle2 size={20} /> Completed</>
                  ) : (
                    <><Circle size={20} /> Mark as Complete</>
                  )}
                </button>
              </div>
            </div>

            <hr className="border-slate-800 my-10" />

            {/* Resources Grid */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <BookOpen className="text-teal-400" /> Curated Resources
              </h3>
              <span className="text-sm text-slate-500 font-medium">{activeNode.resources.length} items found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {activeNode.resources.map((resource, i) => (
                <a 
                  key={i} 
                  href={resource.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(52,211,153,0.1)] h-36"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md">
                      {getResourceIcon(resource.type)} {resource.type}
                    </span>
                    <ExternalLink size={16} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">Via {resource.source}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* AI Chat Mentor */}
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-slate-800 opacity-50 pointer-events-none">
                <MessageSquare size={120} />
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <BrainCircuit className="text-purple-400" /> AI Mentor
                </h4>
                <p className="text-sm text-slate-400 mb-4 max-w-md">
                  Stuck on {activeNode.title}? Ask our AI to explain concepts, provide code snippets, or test your knowledge.
                </p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="E.g., Explain Neural Networks like I'm 5..." 
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white shadow-inner"
                  />
                  <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-purple-500/20">
                    Ask
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}