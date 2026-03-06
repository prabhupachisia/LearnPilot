import { useState } from "react";
import { 
  Send, FileText, Upload, Bot, User, 
  CheckSquare, Square, MessageSquare, Database
} from "lucide-react";

// 🛑 MOCK DATA: Replace with your actual backend/database fetches
const MOCK_DOCS = [
  { id: "d1", name: "Machine_Learning_Syllabus.pdf", size: "2.4 MB" },
  { id: "d2", name: "Python_Cheat_Sheet.pdf", size: "1.1 MB" },
  { id: "d3", name: "Project_Requirements.docx", size: "845 KB" },
];

const INITIAL_MESSAGES = [
  { 
    id: 1, 
    role: "ai", 
    content: "Hello! I am your LearnPilot AI assistant. Select the documents you want me to read from the sidebar, and ask me anything about them!" 
  }
];

export default function DocChat() {
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [selectedDocs, setSelectedDocs] = useState(MOCK_DOCS.map(d => d.id)); // Default: All selected
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Toggle individual document selection
  const toggleDoc = (id) => {
    setSelectedDocs(prev => 
      prev.includes(id) ? prev.filter(docId => docId !== id) : [...prev, id]
    );
  };

  // Select or Deselect All
  const toggleAll = () => {
    if (selectedDocs.length === docs.length) {
      setSelectedDocs([]); // Deselect all
    } else {
      setSelectedDocs(docs.map(d => d.id)); // Select all
    }
  };

  // Handle sending a message
  // Handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add User Message to UI
    const currentInput = inputValue; // save it before clearing
    const userMsg = { id: Date.now(), role: "user", content: currentInput };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // 2. Call your FastAPI Backend
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          selectedDocs: selectedDocs // Sending the IDs of the checked documents!
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from backend");
      }

      const data = await response.json();

      // 3. Add AI Message to UI
      const aiMsg = { 
        id: Date.now() + 1, 
        role: "ai", 
        content: data.response // This is the actual response from Llama-3.1!
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("Chat Error:", error);
      // Fallback message if the server is down
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "ai", 
        content: "Oops! My backend seems to be taking a nap. Make sure FastAPI is running on port 8000!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      {/* 1. LEFT SIDE: MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col relative">
        
        {/* Chat Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <MessageSquare size={20} />
            </div>
            <div>
              <h1 className="font-bold text-slate-100">Document Assistant</h1>
              <p className="text-xs text-slate-400">
                {selectedDocs.length === 0 
                  ? "No documents selected" 
                  : selectedDocs.length === docs.length 
                    ? "Chatting with All Documents" 
                    : `Chatting with ${selectedDocs.length} Document(s)`}
              </p>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
                ${msg.role === 'user' ? 'bg-emerald-500 text-slate-900' : 'bg-purple-600 text-white'}
              `}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-tr-sm' 
                  : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-sm'}
              `}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div className="shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center mt-1">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 rounded-tl-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={selectedDocs.length === 0}
              placeholder={selectedDocs.length === 0 ? "Select a document to start chatting..." : "Ask a question about your documents..."}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-14 py-4 text-sm focus:outline-none focus:border-purple-500 text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || selectedDocs.length === 0}
              className="absolute right-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>

      {/* 2. RIGHT SIDEBAR: DOCUMENT MANAGER */}
      <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
            <Database size={16} /> Knowledge Base
          </h2>
          
          {/* Upload Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            <Upload size={16} /> Upload PDF / Doc
          </button>
        </div>

        {/* Document List */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-semibold text-slate-500">Your Files</span>
            <button 
              onClick={toggleAll}
              className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {selectedDocs.length === docs.length ? "Deselect All" : "Select All"}
            </button>
          </div>

          <div className="space-y-2">
            {docs.map((doc) => {
              const isSelected = selectedDocs.includes(doc.id);
              return (
                <div 
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border
                    ${isSelected 
                      ? 'bg-purple-500/10 border-purple-500/30' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'}
                  `}
                >
                  <div className={`mt-0.5 ${isSelected ? 'text-purple-400' : 'text-slate-600'}`}>
                    {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className={`text-sm font-medium truncate ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                      {doc.name}
                    </h4>
                    <span className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                      <FileText size={12} /> {doc.size}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

    </div>
  );
}