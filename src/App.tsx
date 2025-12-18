import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Certifications from "./pages/Certifications";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import Assessment from "./pages/Assessment";
import Recruiters from "./pages/Recruiters";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AIAssistant } from "./components/AIAssistant";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/assessment/:id" element={<Assessment />} />
              <Route path="/recruiters" element={<Recruiters />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIAssistant />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
