import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <LandingPage />
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
