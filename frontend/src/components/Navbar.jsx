import { Link, useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Sparkles, Plus, LayoutDashboard, Map } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}

        <Link
          to="/paths"
          className="flex items-center gap-2 text-white font-bold text-lg"
        >
          <Sparkles className="text-emerald-400" />
          LearnPilot
        </Link>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/learning-paths"
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
          >
            <Map size={16} />
            Learning Paths
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/pathbuilder")}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 rounded-lg font-semibold hover:bg-emerald-400 transition"
          >
            <Plus size={16} />
            New Path
          </button>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
