
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoriesTable from "@/components/categories/CategoriesTable";
import CategoryForm from "@/components/categories/CategoryForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CategoriesPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditCategory(null); setOpenModal(true) }}>
              <Plus className="mr-2" /> Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-full">
            <CategoryForm
              category={editCategory}
              onComplete={() => setOpenModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      <CategoriesTable
        onEditCategory={(cat) => { setEditCategory(cat); setOpenModal(true) }}
      />
    </div>
  );
};

export default CategoriesPage;
