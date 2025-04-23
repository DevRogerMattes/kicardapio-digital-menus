
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
          <TableHead>Mín. Seleções</TableHead>
          <TableHead>Máx. Seleções</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {optionalGroups?.map((group) => (
          <TableRow key={group.id}>
            <TableCell>{group.name}</TableCell>
            <TableCell>{group.description}</TableCell>
            <TableCell>{group.minSelection}</TableCell>
            <TableCell>{group.maxSelection}</TableCell>
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
      </TableBody>
    </Table>
  );
}
