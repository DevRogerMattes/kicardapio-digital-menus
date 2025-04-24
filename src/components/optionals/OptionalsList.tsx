
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useOptionals } from "@/hooks/useOptionals";

export function OptionalsList() {
  const { optionalGroups, isLoading } = useOptionals();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Mínimo</TableHead>
          <TableHead>Máximo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {optionalGroups?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.description || '-'}</TableCell>
            <TableCell>R$ {Number(item.price || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</TableCell>
            <TableCell>{item.min_selection}</TableCell>
            <TableCell>{item.max_selection}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {optionalGroups?.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              Nenhum item opcional cadastrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
