
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useIsMobile } from "./hooks/use-mobile";

// Mobile Pages
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

// Web Pages
import WebIndex from "./pages/web/WebIndex";
import WebFashionPage from "./pages/web/WebFashionPage";
import WebCosmeticsPage from "./pages/web/WebCosmeticsPage";
import WebAccessoriesPage from "./pages/web/WebAccessoriesPage";
import WebProductDetail from "./pages/web/WebProductDetail";
import WebProfilePage from "./pages/web/WebProfilePage";
import WebCartPage from "./pages/web/WebCartPage";
import WebCheckoutPage from "./pages/web/WebCheckoutPage";
import WebOrderSummaryPage from "./pages/web/WebOrderSummaryPage";
import WebChatPage from "./pages/web/WebChatPage";
import WebHelpPage from "./pages/web/WebHelpPage";
import WebMyOrdersPage from "./pages/web/WebMyOrdersPage";
import WebLoginPage from "./pages/web/WebLoginPage";
import WebVirtualTrialPage from "./pages/web/WebVirtualTrialPage";
import WebVirtualFittingPage from "./pages/web/WebVirtualFittingPage";
import WebWishlistPage from "./pages/web/WebWishlistPage";
import WebAccountSettingsPage from "./pages/web/WebAccountSettingsPage";

// Admin Pages
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import AdminAccountSettingsPage from "./pages/admin/AdminAccountSettingsPage";

// Auto-redirect based on device
const ResponsiveRedirect = () => {
  const isMobile = useIsMobile();
  return isMobile ? <Navigate to="/" /> : <Navigate to="/web" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default route: Detect device and redirect */}
            <Route path="/" element={<ResponsiveRedirect />} />

            {/* Mobile Routes */}
            <Route path="/mobile" element={<Index />} />
            <Route path="/mobile/search" element={<Index />} />
            <Route path="/mobile/product/:id" element={<ProductDetail />} />
            <Route path="/mobile/fashion" element={<FashionPage />} />
            <Route path="/mobile/cosmetics" element={<CosmeticsPage />} />
            <Route path="/mobile/accessories" element={<AccessoriesPage />} />
            <Route path="/mobile/virtual-fitting/:id" element={<VirtualFittingPage />} />
            <Route path="/mobile/virtual-trial/:id" element={<VirtualTrialPage />} />
            <Route path="/mobile/accessories-trial/:id" element={<VirtualTrialPage />} />
            <Route path="/mobile/profile" element={<ProfilePage />} />
            <Route path="/mobile/orders" element={<MyOrdersPage />} />
            <Route path="/mobile/wishlist" element={<WishlistPage />} />
            <Route path="/mobile/cart" element={<CartPage />} />
            <Route path="/mobile/checkout" element={<CheckoutPage />} />
            <Route path="/mobile/order-summary" element={<OrderSummaryPage />} />
            <Route path="/mobile/login" element={<LoginPage />} />
            <Route path="/mobile/register" element={<RegisterPage />} />
            <Route path="/mobile/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/mobile/chat" element={<ChatPage />} />
            <Route path="/mobile/help" element={<HelpPage />} />
            
            {/* Web Routes */}
            <Route path="/web" element={<WebIndex />} />
            <Route path="/web/fashion" element={<WebFashionPage />} />
            <Route path="/web/cosmetics" element={<WebCosmeticsPage />} />
            <Route path="/web/accessories" element={<WebAccessoriesPage />} />
            <Route path="/web/product/:id" element={<WebProductDetail />} />
            <Route path="/web/profile" element={<WebProfilePage />} />
            <Route path="/web/orders" element={<WebMyOrdersPage />} />
            <Route path="/web/cart" element={<WebCartPage />} />
            <Route path="/web/checkout" element={<WebCheckoutPage />} />
            <Route path="/web/order-summary" element={<WebOrderSummaryPage />} />
            <Route path="/web/login" element={<WebLoginPage />} />
            <Route path="/web/chat" element={<WebChatPage />} />
            <Route path="/web/help" element={<WebHelpPage />} />
            <Route path="/web/virtual-fitting/:id" element={<WebVirtualFittingPage />} />
            <Route path="/web/virtual-trial/:id" element={<WebVirtualTrialPage />} />
            <Route path="/web/accessories-trial/:id" element={<WebVirtualTrialPage />} />
            <Route path="/web/wishlist" element={<WebWishlistPage />} />
            <Route path="/web/register" element={<RegisterPage />} />
            <Route path="/web/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/web/account-settings" element={<WebAccountSettingsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/new" element={<AdminProductForm />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/customers" element={<AdminCustomersPage />} />
            <Route path="/admin/account-settings" element={<AdminAccountSettingsPage />} />
            
            {/* Maintain backwards compatibility with old routes */}
            <Route path="/search" element={<Navigate to="/mobile/search" />} />
            <Route path="/product/:id" element={<Navigate to={`/mobile/product/:id`} />} />
            <Route path="/fashion" element={<Navigate to="/mobile/fashion" />} />
            <Route path="/cosmetics" element={<Navigate to="/mobile/cosmetics" />} />
            <Route path="/accessories" element={<Navigate to="/mobile/accessories" />} />
            <Route path="/virtual-fitting/:id" element={<Navigate to={`/mobile/virtual-fitting/:id`} />} />
            <Route path="/virtual-trial/:id" element={<Navigate to={`/mobile/virtual-trial/:id`} />} />
            <Route path="/accessories-trial/:id" element={<Navigate to={`/mobile/accessories-trial/:id`} />} />
            <Route path="/profile" element={<Navigate to="/mobile/profile" />} />
            <Route path="/orders" element={<Navigate to="/mobile/orders" />} />
            <Route path="/wishlist" element={<Navigate to="/mobile/wishlist" />} />
            <Route path="/cart" element={<Navigate to="/mobile/cart" />} />
            <Route path="/checkout" element={<Navigate to="/mobile/checkout" />} />
            <Route path="/order-summary" element={<Navigate to="/mobile/order-summary" />} />
            <Route path="/login" element={<Navigate to="/mobile/login" />} />
            <Route path="/register" element={<Navigate to="/mobile/register" />} />
            <Route path="/forgot-password" element={<Navigate to="/mobile/forgot-password" />} />
            <Route path="/chat" element={<Navigate to="/mobile/chat" />} />
            <Route path="/help" element={<Navigate to="/mobile/help" />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
