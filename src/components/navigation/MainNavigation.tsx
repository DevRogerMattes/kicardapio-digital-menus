
import React from "react";
import { Link, useLocation } from "react-router-dom";
import KiCardapioLogo from "../logo/KiCardapioLogo";
import { Button } from "@/components/ui/button";

const MainNavigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <KiCardapioLogo size="md" variant="full" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-kicardapio-red ${
                isActive("/") ? "text-kicardapio-red" : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/planos"
              className={`text-sm font-medium transition-colors hover:text-kicardapio-red ${
                isActive("/planos") ? "text-kicardapio-red" : "text-gray-600"
              }`}
            >
              Planos
            </Link>
            <Link
              to="/sobre"
              className={`text-sm font-medium transition-colors hover:text-kicardapio-red ${
                isActive("/sobre") ? "text-kicardapio-red" : "text-gray-600"
              }`}
            >
              Sobre
            </Link>
            <Link
              to="/demo/pizzaria-do-joao"
              className={`text-sm font-medium transition-colors hover:text-kicardapio-red ${
                location.pathname.includes("/demo") ? "text-kicardapio-red" : "text-gray-600"
              }`}
            >
              Demo
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/cadastro">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
