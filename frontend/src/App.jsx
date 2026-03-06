import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Explore from "./pages/Explore";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import Home from "./pages/Home";
import PathBuilder from "./pages/PathBuilder";
import Dashboard from "./pages/Dashboard";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Home />} />

            {/* Protected Onboarding Route (Wizard) */}
            <Route
              path="/onboarding"
              element={
                <>
                  <SignedIn>
                    <PathBuilder />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" replace />
                  </SignedOut>
                </>
              }
            />

            {/* Protected Quiz Route */}
            <Route
              path="/quiz"
              element={
                <>
                  <SignedIn>
                    <Quiz />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" replace />
                  </SignedOut>
                </>
              }
            />

            {/* Protected Explore Route */}
            <Route
              path="/explore"
              element={
                <>
                  <SignedIn>
                    <Explore />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/" replace />
                  </SignedOut>
                </>
              }
            />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    {/* Bounces logged-out users back to the home URL cleanly */}
                    <Navigate to="/" replace />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default App;
