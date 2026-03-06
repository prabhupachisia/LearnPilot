import { UserButton, useUser } from "@clerk/clerk-react";
import { PlusCircle, History, BookOpen } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="font-bold text-xl text-slate-800">
            My Learning Studio
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 hidden sm:block">
              Welcome back, {user?.firstName}!
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Area */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-2">Ready for a new skill?</h3>
            <p className="opacity-90 mb-6">
              Enter your goal and our AI will build your custom roadmap.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Become a React Developer"
                className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition">
                Generate
              </button>
            </div>
          </div>

          <section>
            <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
              <History size={20} /> Active Pathways
            </h4>
            <div className="grid gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition cursor-pointer">
                <p className="font-semibold">FastAPI & Groq Backend Dev</p>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3">
                  <div className="bg-blue-600 h-2 rounded-full w-[40%]"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200">
            <h4 className="font-bold mb-4 flex items-center gap-2 italic">
              <BookOpen size={18} /> Daily Insight
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              "The best way to learn is by doing. Try to apply your
              'Foundational Concepts' node to a real project today."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
