import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // <-- Add Navigate here
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Route */}
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
    </ClerkProvider>
  );
}

export default App;