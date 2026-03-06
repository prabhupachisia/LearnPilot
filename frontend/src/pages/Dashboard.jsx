import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

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
} from "lucide-react";

// ---------------- MOCK ROADMAP DATA ----------------
// Later your backend will replace this with AI generated roadmap
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
      {
        type: "practice",
        title: "Titanic Dataset Prediction",
        source: "Kaggle",
        url: "#",
      },
    ],
  },
  {
    id: "step_4",
    title: "Deep Learning & Neural Networks",
    description:
      "Dive deep into neural networks, backpropagation, and build models using PyTorch or TensorFlow.",
    resources: [
      {
        type: "video",
        title: "Neural Networks from Scratch",
        source: "YouTube",
        url: "#",
      },
      {
        type: "doc",
        title: "PyTorch 60-Minute Blitz",
        source: "PyTorch",
        url: "#",
      },
    ],
  },
];

export default function Dashboard() {
  const location = useLocation();
  const { user } = useUser();

  const userGoal = location.state?.goal || "Become a Data Scientist";

  const [isGenerating, setIsGenerating] = useState(true);
  const [activeNode, setActiveNode] = useState(MOCK_ROADMAP[0]);
  const [completedNodes, setCompletedNodes] = useState([]);

  // Fake AI loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 2500);
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
        return <PlaySquare className="text-red-400" size={20} />;
      case "doc":
        return <BookOpen className="text-blue-400" size={20} />;
      case "practice":
        return <Code className="text-emerald-400" size={20} />;
      default:
        return <ExternalLink className="text-slate-400" size={20} />;
    }
  };

  // ---------------- LOADING SCREEN ----------------
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <BrainCircuit
          size={64}
          className="text-emerald-500 animate-pulse mb-6"
        />

        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
          AI is mapping your journey...
        </h2>

        <p className="text-slate-400">Analyzing skills for: "{userGoal}"</p>

        <div className="mt-8 w-80 bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm text-emerald-400/70">
          <p className="animate-pulse"> Extracting required skills...</p>
          <p className="animate-pulse" style={{ animationDelay: "0.5s" }}>
            Curating top resources...
          </p>
          <p className="animate-pulse" style={{ animationDelay: "1s" }}>
            Building timeline nodes...
          </p>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD ----------------
  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex flex-col overflow-hidden">
      {/* NAVBAR */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
            <Sparkles size={20} className="text-slate-950" />
          </div>

          <div>
            <h1 className="font-bold text-xl text-white">
              LearnPilot Dashboard
            </h1>

            <p className="text-xs text-slate-400">
              Welcome {user?.firstName} (
              {user?.primaryEmailAddress?.emailAddress})
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Goal: {userGoal}</span>
            <span className="text-emerald-400">{progress}% Completed</span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Clerk User Menu */}
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* ROADMAP SIDEBAR */}
        <aside className="w-80 bg-slate-900 border-r border-slate-800 overflow-y-auto p-6">
          <h2 className="text-xs font-bold uppercase text-slate-500 mb-6">
            Your Roadmap
          </h2>

          <div className="space-y-6">
            {MOCK_ROADMAP.map((node, index) => {
              const isCompleted = completedNodes.includes(node.id);
              const isActive = activeNode.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className="cursor-pointer"
                >
                  <h3
                    className={`font-semibold ${
                      isActive ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {index + 1}. {node.title}
                  </h3>

                  <p className="text-sm text-slate-500">{node.description}</p>
                </div>
              );
            })}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-10 overflow-y-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            {activeNode.title}
          </h2>

          <p className="text-slate-400 mb-8">{activeNode.description}</p>

          {/* COMPLETE BUTTON */}
          <button
            onClick={() => toggleComplete(activeNode.id)}
            className="mb-8 bg-emerald-600 px-6 py-3 rounded-lg font-bold"
          >
            {completedNodes.includes(activeNode.id)
              ? "Completed"
              : "Mark as Complete"}
          </button>

          {/* RESOURCES */}
          <div className="grid md:grid-cols-2 gap-4">
            {activeNode.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-900 border border-slate-800 rounded-lg hover:border-emerald-500"
              >
                <div className="flex items-center gap-2 mb-2">
                  {getResourceIcon(resource.type)}
                  <span className="text-xs uppercase text-slate-500">
                    {resource.type}
                  </span>
                </div>

                <h4 className="font-semibold text-white">{resource.title}</h4>

                <p className="text-sm text-slate-500">Via {resource.source}</p>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
