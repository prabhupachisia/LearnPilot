import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Home />} />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>

                  <SignedOut>
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
