
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TenantHeader from "@/components/menu/TenantHeader";
import CategoryTabs from "@/components/menu/CategoryTabs";
import TableInfo from "@/components/menu/TableInfo";
import { 
  getTenantBySlug, 
  getCategoriesByTenant, 
  getProductsByTenantAndCategory 
} from "@/data/mockData";

const MenuPage: React.FC = () => {
  const { slug, table } = useParams<{ slug: string; table?: string }>();
  
  const tenant = getTenantBySlug(slug || "");
  
  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Cardápio não encontrado</h1>
        <p className="text-muted-foreground mb-6">
          O cardápio que você está procurando não existe ou foi removido.
        </p>
        <Button asChild>
          <Link to="/">Voltar para o início</Link>
        </Button>
      </div>
    );
  }

  const categories = getCategoriesByTenant(tenant.id);
  
  // Get all products for the tenant
  const allProducts = categories.flatMap(category => 
    getProductsByTenantAndCategory(tenant.id, category.id)
  );

  return (
    <div 
      className="min-h-screen pb-16"
      style={{
        // Apply tenant's theme colors if available
        ...(tenant.primaryColor && {
          "--primary": tenant.primaryColor,
        }),
        ...(tenant.secondaryColor && {
          "--secondary": tenant.secondaryColor,
        }),
      } as React.CSSProperties}
    >
      <div className="container mx-auto px-4 pt-6">
        <div className="mb-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Voltar</span>
          </Link>
        </div>

        <TenantHeader tenant={tenant} />
        
        <TableInfo tableNumber={table} />

        <CategoryTabs categories={categories} products={allProducts} />
      </div>
    </div>
  );
};

export default MenuPage;
