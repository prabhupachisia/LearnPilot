import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-react";

import "./index.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import PathBuilder from "./pages/PathBuilder";
import LearningPaths from "./pages/LearningPaths";
import ProtectedLayout from "./components/ProtectedLayout";
import LearningView from "./components/LearningView";
import DocChat from "./pages/DocChat";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />

            {/* Protected Layout */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/pathbuilder" element={<PathBuilder />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/learning-view/:pathId" element={<LearningView />} />
              <Route path="/chat" element={<DocChat />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default App;
