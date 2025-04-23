
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OptionalsList } from "@/components/optionals/OptionalsList";
import { OptionalForm } from "@/components/optionals/OptionalForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function OptionalsPage() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Itens Opcionais</h1>
        <Sheet open={isCreating} onOpenChange={setIsCreating}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              Novo Item Opcional
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Novo Item Opcional</SheetTitle>
            </SheetHeader>
            <OptionalForm onSuccess={() => setIsCreating(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Itens Opcionais</CardTitle>
        </CardHeader>
        <CardContent>
          <OptionalsList />
        </CardContent>
      </Card>
    </div>
  );
}
