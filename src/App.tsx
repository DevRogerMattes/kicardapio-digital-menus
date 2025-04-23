
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MenuPage from "./pages/MenuPage";
import AdminDashboard from "./pages/AdminDashboard";
import QRCodePage from "./pages/QRCodePage";
import PlansPage from "./pages/PlansPage";
import ProductsPage from "./pages/admin/Products";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OptionalsPage from "./pages/admin/Optionals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/planos" element={<PlansPage />} />
          <Route path="/demo/:slug" element={<MenuPage />} />
          <Route path="/demo/:slug/mesa/:table" element={<MenuPage />} />
          <Route path="/qrcodes/:slug" element={<QRCodePage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/admin/opcionais" element={<OptionalsPage />} />
          
          {/* Login and Register Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
