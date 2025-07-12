import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/slices/userSlice";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DonationsList from "./pages/DonationsList";

import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationsModal from "@/components/NotificationsModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [rehydrated, setRehydrated] = useState(false);
  useEffect(() => {
    // On app load, rehydrate Redux user state from localStorage
    const userJson = localStorage.getItem("foodShareUser");
    const token = localStorage.getItem("foodShareToken");
    if (userJson && token) {
      try {
        const user = JSON.parse(userJson);
        dispatch(setUser({ user, token }));
      } catch {}
    }
    setRehydrated(true);
  }, [dispatch]);

  if (!rehydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-sage-500 text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar onShowNotifications={() => setShowNotifications(true)} />
          <NotificationsModal
            open={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donations" element={<DonationsList />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
