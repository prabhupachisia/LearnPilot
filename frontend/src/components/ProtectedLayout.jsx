import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProtectedLayout() {
  return (
    <>
      <SignedIn>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-slate-200">
          <Outlet />
        </div>
      </SignedIn>

      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
}
