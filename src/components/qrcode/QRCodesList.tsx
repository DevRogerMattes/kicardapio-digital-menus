
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCodeIcon } from "lucide-react";
import { executeQuery } from "@/lib/mysql";
import { toast } from "sonner";

interface QRCode {
  id: string;
  table_number: string;
  qr_code_url: string;
  restaurant_id: string;
}

interface QRCodesListProps {
  restaurantId: string | null;
}

const QRCodesList: React.FC<QRCodesListProps> = ({ restaurantId }) => {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!restaurantId) return;
    
    const fetchQrCodes = async () => {
      try {
        const result = await executeQuery<QRCode>(
          'SELECT * FROM table_qr_codes WHERE restaurant_id = ? ORDER BY table_number',
          [restaurantId]
        );
        setQrCodes(result);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
        toast.error("Erro ao carregar QR Codes");
      } finally {
        setLoading(false);
      }
    };

    fetchQrCodes();
  }, [restaurantId]);

  const printQrCode = (tableNumber: string) => {
    // Store current document content
    const originalContents = document.body.innerHTML;
    
    // Get the QR code card
    const qrCard = document.getElementById(`qr-card-${tableNumber}`);
    
    if (qrCard) {
      // Replace document content with just the QR code to print
      document.body.innerHTML = qrCard.innerHTML;
      window.print();
      // Restore original content
      document.body.innerHTML = originalContents;
    }
  };

  if (!restaurantId) {
    return (
      <div className="text-center p-4">
        <p>Você precisa estar logado para visualizar os QR Codes.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <p>Carregando QR Codes...</p>
      </div>
    );
  }

  if (qrCodes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/30">
        <QrCodeIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
        <h3 className="text-lg font-medium">Nenhum QR Code gerado</h3>
        <p className="text-muted-foreground">Utilize o botão "Gerar QR Codes" para criar QR Codes para suas mesas</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {qrCodes.map((qrCode) => (
        <Card key={qrCode.id} id={`qr-card-${qrCode.table_number}`}>
          <CardHeader>
            <CardTitle className="text-center">Mesa {qrCode.table_number}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 bg-white flex items-center justify-center rounded-lg border p-2">
              {qrCode.qr_code_url ? (
                <img 
                  src={qrCode.qr_code_url} 
                  alt={`QR Code Mesa ${qrCode.table_number}`}
                  className="w-full h-full"
                />
              ) : (
                <QrCodeIcon className="w-24 h-24 text-gray-400" />
              )}
            </div>
            <Button 
              variant="outline" 
              onClick={() => printQrCode(qrCode.table_number)}
            >
              Imprimir QR Code
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QRCodesList;
