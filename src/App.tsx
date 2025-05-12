
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useIsMobile } from "./hooks/use-mobile";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import FashionPage from "./pages/FashionPage";
import CosmeticsPage from "./pages/CosmeticsPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import VirtualFittingPage from "./pages/VirtualFittingPage";
import VirtualTrialPage from "./pages/VirtualTrialPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ChatPage from "./pages/ChatPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import WishlistPage from "./pages/WishlistPage";
import HelpPage from "./pages/HelpPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

// Admin Pages
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminAccountSettingsPage from "./pages/admin/AdminAccountSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Routes - Responsive */}
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/fashion" element={<FashionPage />} />
            <Route path="/cosmetics" element={<CosmeticsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/virtual-fitting/:id" element={<VirtualFittingPage />} />
            <Route path="/virtual-trial/:id" element={<VirtualTrialPage />} />
            <Route path="/accessories-trial/:id" element={<VirtualTrialPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/account-settings" element={<AccountSettingsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/new" element={<AdminProductForm />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/customers" element={<AdminCustomersPage />} />
            <Route path="/admin/account-settings" element={<AdminAccountSettingsPage />} />
            
            {/* Legacy /web routes that redirect to main routes */}
            <Route path="/web" element={<Navigate to="/" replace />} />
            <Route path="/web/fashion" element={<Navigate to="/fashion" replace />} />
            <Route path="/web/cosmetics" element={<Navigate to="/cosmetics" replace />} />
            <Route path="/web/accessories" element={<Navigate to="/accessories" replace />} />
            <Route path="/web/product/:id" element={<Navigate to="/product/:id" replace />} />
            <Route path="/web/profile" element={<Navigate to="/profile" replace />} />
            <Route path="/web/orders" element={<Navigate to="/orders" replace />} />
            <Route path="/web/cart" element={<Navigate to="/cart" replace />} />
            <Route path="/web/checkout" element={<Navigate to="/checkout" replace />} />
            <Route path="/web/order-summary" element={<Navigate to="/order-summary" replace />} />
            <Route path="/web/login" element={<Navigate to="/login" replace />} />
            <Route path="/web/chat" element={<Navigate to="/chat" replace />} />
            <Route path="/web/help" element={<Navigate to="/help" replace />} />
            <Route path="/web/virtual-fitting/:id" element={<Navigate to="/virtual-fitting/:id" replace />} />
            <Route path="/web/virtual-trial/:id" element={<Navigate to="/virtual-trial/:id" replace />} />
            <Route path="/web/accessories-trial/:id" element={<Navigate to="/accessories-trial/:id" replace />} />
            <Route path="/web/wishlist" element={<Navigate to="/wishlist" replace />} />
            <Route path="/web/account-settings" element={<Navigate to="/account-settings" replace />} />
            
            {/* Legacy /mobile routes that redirect to main routes */}
            <Route path="/mobile" element={<Navigate to="/" replace />} />
            <Route path="/mobile/search" element={<Navigate to="/search" replace />} />
            <Route path="/mobile/product/:id" element={<Navigate to="/product/:id" replace />} />
            <Route path="/mobile/fashion" element={<Navigate to="/fashion" replace />} />
            <Route path="/mobile/cosmetics" element={<Navigate to="/cosmetics" replace />} />
            <Route path="/mobile/accessories" element={<Navigate to="/accessories" replace />} />
            <Route path="/mobile/virtual-fitting/:id" element={<Navigate to="/virtual-fitting/:id" replace />} />
            <Route path="/mobile/virtual-trial/:id" element={<Navigate to="/virtual-trial/:id" replace />} />
            <Route path="/mobile/accessories-trial/:id" element={<Navigate to="/accessories-trial/:id" replace />} />
            <Route path="/mobile/profile" element={<Navigate to="/profile" replace />} />
            <Route path="/mobile/orders" element={<Navigate to="/orders" replace />} />
            <Route path="/mobile/wishlist" element={<Navigate to="/wishlist" replace />} />
            <Route path="/mobile/cart" element={<Navigate to="/cart" replace />} />
            <Route path="/mobile/checkout" element={<Navigate to="/checkout" replace />} />
            <Route path="/mobile/order-summary" element={<Navigate to="/order-summary" replace />} />
            <Route path="/mobile/login" element={<Navigate to="/login" replace />} />
            <Route path="/mobile/register" element={<Navigate to="/register" replace />} />
            <Route path="/mobile/forgot-password" element={<Navigate to="/forgot-password" replace />} />
            <Route path="/mobile/chat" element={<Navigate to="/chat" replace />} />
            <Route path="/mobile/help" element={<Navigate to="/help" replace />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
