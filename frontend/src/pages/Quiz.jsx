import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, CheckCircle, XCircle, ArrowRight, Sparkles, RefreshCcw } from "lucide-react";

// MOCK DATA: AI-Generated Quiz for the current topic
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following is a mutable data type in Python?",
    options: ["Tuple", "String", "List", "Integer"],
    correctAnswer: "List"
  },
  {
    id: 2,
    question: "What is the primary purpose of the '__init__' method in Python classes?",
    options: [
      "To initialize the class attributes",
      "To import external libraries",
      "To delete an object",
      "To define a loop"
    ],
    correctAnswer: "To initialize the class attributes"
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAdapting, setIsAdapting] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === MOCK_QUESTIONS[currentIdx].correctAnswer) {
      setScore(score + 1);
    }

    if (currentIdx + 1 < MOCK_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  // Fake AI adaptation effect if they don't get a perfect score
  useEffect(() => {
    if (showResults && score < MOCK_QUESTIONS.length) {
      setIsAdapting(true);
      const timer = setTimeout(() => setIsAdapting(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showResults, score]);

  const returnToDashboard = () => {
    navigate("/dashboard");
  };

  // ----------------------------------------------------------------
  // RESULTS SCREEN
  // ----------------------------------------------------------------
  if (showResults) {
    const passed = score === MOCK_QUESTIONS.length;

    if (isAdapting && !passed) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
          <RefreshCcw size={64} className="text-purple-500 animate-spin mb-6" />
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Adapting Your Roadmap...
          </h2>
          <p className="text-slate-400 text-center max-w-md">
            You scored {score}/{MOCK_QUESTIONS.length}. Our AI is adjusting your path to include some review materials before you move on.
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          {passed ? (
            <CheckCircle size={80} className="text-emerald-500 mx-auto mb-6" />
          ) : (
            <Brain size={80} className="text-purple-500 mx-auto mb-6" />
          )}
          
          <h2 className="text-3xl font-extrabold text-white mb-2">
            {passed ? "Perfect Score!" : "Path Adapted!"}
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            {passed 
              ? "You've mastered this topic. Ready for the next one?" 
              : "We've injected 2 new prerequisite nodes into your roadmap to strengthen your foundation."}
          </p>

          <button 
            onClick={returnToDashboard}
            className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Return to Dashboard <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // QUIZ SCREEN
  // ----------------------------------------------------------------
  const question = MOCK_QUESTIONS[currentIdx];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans text-slate-200">
      <div className="w-full max-w-2xl relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg"><Brain className="text-emerald-400" size={24} /></div>
            <h2 className="text-xl font-bold text-white">Knowledge Check</h2>
          </div>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Question {currentIdx + 1} of {MOCK_QUESTIONS.length}
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl mb-8">
          <h3 className="text-2xl font-bold text-white mb-8">{question.question}</h3>
          
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 font-medium text-lg
                  ${selectedAnswer === option 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-end">
          <button 
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {currentIdx + 1 === MOCK_QUESTIONS.length ? (
              <><Sparkles size={20} /> Finish & Evaluate</>
            ) : (
              <>Next Question <ArrowRight size={20} /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}