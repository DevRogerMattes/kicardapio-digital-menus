
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductsTable from "@/components/products/ProductsTable";
import ProductForm from "@/components/products/ProductForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ProductsPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditProduct(null); setOpenModal(true) }}>
              <Plus className="mr-2" /> Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-full">
            <ProductForm
              product={editProduct}
              onComplete={() => setOpenModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <ProductsTable
        onEditProduct={(prod) => { setEditProduct(prod); setOpenModal(true)}}
      />
    </div>
  );
};

export default ProductsPage;
