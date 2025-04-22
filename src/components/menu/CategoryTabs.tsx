
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Category, Product } from "@/types/models";
import ProductCard from "./ProductCard";

interface CategoryTabsProps {
  categories: Category[];
  products: Product[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, products }) => {
  const defaultCategoryId = categories.length > 0 ? categories[0].id : "";

  return (
    <Tabs defaultValue={defaultCategoryId} className="w-full">
      <div className="mb-8 overflow-auto">
        <TabsList className="bg-kicardapio-beige inline-flex h-auto p-1 w-full md:w-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 rounded-md data-[state=active]:bg-kicardapio-orange data-[state=active]:text-white whitespace-nowrap"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.categoryId === category.id
        );

        return (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            {category.description && (
              <p className="text-muted-foreground mb-6">{category.description}</p>
            )}
            
            <div className="menu-grid">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default CategoryTabs;
