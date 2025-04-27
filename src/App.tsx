
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import VirtualFittingPage from "./pages/VirtualFittingPage";
import VirtualTrialPage from "./pages/VirtualTrialPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/fashion" element={<CategoryPage />}>
              <Route path=":category" element={<CategoryPage />} />
            </Route>
            <Route path="/cosmetics" element={<CategoryPage />} />
            <Route path="/accessories" element={<CategoryPage />} />
            <Route path="/virtual-fitting/:id" element={<VirtualFittingPage />} />
            <Route path="/virtual-trial/:id" element={<VirtualTrialPage />} />
            <Route path="/accessories-trial/:id" element={<VirtualTrialPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/orders" element={<ProfilePage />} />
            <Route path="/wishlist" element={<ProfilePage />} />
            <Route path="/history" element={<ProfilePage />} />
            <Route path="/settings" element={<ProfilePage />} />
            <Route path="/help" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
