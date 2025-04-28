
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthRestaurant } from "@/hooks/useAuthRestaurant";
import QRCodesList from "@/components/qrcode/QRCodesList";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const QRCodesPage: React.FC = () => {
  const restaurantId = useAuthRestaurant();
  const [numberOfTables, setNumberOfTables] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const handleGenerateQRCodes = () => {
    if (numberOfTables < 1) {
      toast.error("O número de mesas deve ser maior que 0");
      return;
    }

    // This will be implemented with Supabase later
    toast.success(`${numberOfTables} QR Codes gerados com sucesso!`);
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">QR Codes das Mesas</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="w-4 h-4 mr-2" />
              Gerar QR Codes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gerar QR Codes para Mesas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tables">Número de Mesas</Label>
                <Input
                  id="tables"
                  type="number"
                  min="1"
                  value={numberOfTables}
                  onChange={(e) => setNumberOfTables(parseInt(e.target.value) || 1)}
                />
              </div>
              <Button onClick={handleGenerateQRCodes} className="w-full">
                Gerar QR Codes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <QRCodesList restaurantId={restaurantId} />
    </div>
  );
};

export default QRCodesPage;
