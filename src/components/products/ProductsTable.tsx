
import React from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useOptionals } from "@/hooks/useOptionals";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, List } from "lucide-react";

interface ProductsTableProps {
  onEditProduct: (prod: any) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ onEditProduct }) => {
  const { products, isLoading, removeProduct } = useProducts();
  const { categories } = useCategories();
  const { optionalGroups } = useOptionals();

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Possui Opcionais</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400">?</div>
                )}
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell className="flex items-center gap-2">
                {p.category_image_url && (
                  <img src={p.category_image_url} alt="" className="w-6 h-6 rounded object-cover" />
                )}
                {p.category_name}
              </TableCell>
              <TableCell>
                R$ {Number(p.price).toLocaleString("pt-BR",{minimumFractionDigits:2})}
              </TableCell>
              <TableCell>
                {p.has_optionals ?
                  <span className="text-green-600 flex items-center gap-1"><List />Sim</span>
                  : <span className="text-muted-foreground">Não</span>
                }
              </TableCell>
              <TableCell>
                {p.active ?
                  <span className="text-green-700 font-medium">Ativo</span>
                  : <span className="text-gray-500">Inativo</span>
                }
              </TableCell>
              <TableCell>
                <Button variant="outline" size="icon" onClick={() => onEditProduct(p)} title="Editar">
                  <Edit />
                </Button>
                <Button variant="destructive" size="icon" className="ml-2" onClick={() => removeProduct(p.id)} title="Deletar">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products.length === 0 && (
        <div className="py-10 text-center text-gray-400">Nenhum produto cadastrado.</div>
      )}
    </div>
  );
};

export default ProductsTable;
