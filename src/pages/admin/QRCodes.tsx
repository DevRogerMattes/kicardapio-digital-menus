
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCodesList from "@/components/qrcode/QRCodesList";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuthRestaurant } from "@/hooks/useAuthRestaurant";
import { insert, executeQuery } from "@/lib/mysql";
import QRCode from 'qrcode';

const QRCodesPage: React.FC = () => {
  const restaurantId = useAuthRestaurant();
  const [numberOfTables, setNumberOfTables] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurantSlug, setRestaurantSlug] = useState<string>("");

  // Fetch restaurant slug when component mounts
  useEffect(() => {
    if (!restaurantId) return;
    
    const fetchRestaurantData = async () => {
      try {
        const restaurant = await executeQuery(
          'SELECT slug FROM restaurants WHERE id = ?',
          [restaurantId]
        );
        
        if (restaurant && restaurant.length > 0) {
          setRestaurantSlug(restaurant[0].slug);
        }
      } catch (error) {
        console.error("Error fetching restaurant slug:", error);
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  const handleGenerateQRCodes = async () => {
    if (!restaurantId) {
      toast.error("Você precisa estar logado para gerar QR Codes");
      return;
    }

    if (!restaurantSlug) {
      toast.error("Não foi possível obter o slug do restaurante");
      return;
    }

    if (numberOfTables < 1) {
      toast.error("O número de mesas deve ser maior que 0");
      return;
    }

    setLoading(true);

    try {
      // First check if there are existing QR codes
      const existingQRCodes = await executeQuery(
        'SELECT table_number FROM table_qr_codes WHERE restaurant_id = ?',
        [restaurantId]
      );
      
      const existingTableNumbers = new Set(existingQRCodes.map(qr => qr.table_number));
      let successCount = 0;
      
      // Generate QR Codes for each table
      for (let i = 1; i <= numberOfTables; i++) {
        const tableNumber = i.toString();
        
        // Skip if this table already has a QR code
        if (existingTableNumbers.has(tableNumber)) {
          continue;
        }
        
        // Generate unique ID for QR code
        const id = crypto.randomUUID();
        
        // URL for this table QR code (with restaurant slug and table number)
        const url = `${window.location.origin}/${restaurantSlug}/mesa/${tableNumber}`;
        
        // Generate QR code image (as data URL)
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          color: {
            dark: '#000000',
            light: '#ffffff'
          },
          width: 300,
          margin: 1
        });
        
        // Insert into database
        await insert('table_qr_codes', {
          id,
          restaurant_id: restaurantId,
          table_number: tableNumber,
          qr_code_url: qrCodeDataUrl
        });
        
        successCount++;
      }
      
      if (successCount > 0) {
        toast.success(`${successCount} QR Codes gerados com sucesso!`);
      } else {
        toast.info("Nenhum novo QR Code foi gerado (as mesas já possuem QR Codes)");
      }
    } catch (error) {
      console.error("Error generating QR codes:", error);
      toast.error("Erro ao gerar QR Codes");
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
              <Button 
                onClick={handleGenerateQRCodes} 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Gerando..." : "Gerar QR Codes"}
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
