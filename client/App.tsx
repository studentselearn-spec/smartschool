import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Reports from "./pages/Reports";
import BrandingSettings from "./pages/BrandingSettings";
import ParentPortal from "./pages/ParentPortal";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketing" element={<Landing />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/branding" element={<BrandingSettings />} />
          <Route path="/parent" element={<ParentPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
