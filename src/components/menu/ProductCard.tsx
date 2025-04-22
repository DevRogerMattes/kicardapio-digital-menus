
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/models";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-muted">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <CardContent className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg truncate">{product.name}</h3>
          <span className="font-bold text-kicardapio-red ml-2 whitespace-nowrap">
            {formatCurrency(product.price)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Button variant="outline" className="w-full">
          {product.hasOptions ? "Personalizar" : "Adicionar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
