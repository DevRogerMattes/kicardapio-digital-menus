
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-8xl font-bold text-kicardapio-red mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! Página não encontrada</p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild>
          <Link to="/">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
