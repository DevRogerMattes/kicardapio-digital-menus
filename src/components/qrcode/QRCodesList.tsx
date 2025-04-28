
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { qrCodeIcon } from "lucide-react";

interface QRCodesListProps {
  restaurantId: string | null;
}

const QRCodesList: React.FC<QRCodesListProps> = ({ restaurantId }) => {
  if (!restaurantId) {
    return (
      <div className="text-center p-4">
        <p>Você precisa estar logado para visualizar os QR Codes.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* This will be replaced with actual QR codes from Supabase later */}
      {[1, 2, 3].map((table) => (
        <Card key={table}>
          <CardHeader>
            <CardTitle className="text-center">Mesa {table}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
              {/* Placeholder for QR Code image */}
              <qrCodeIcon className="w-24 h-24 text-gray-400" />
            </div>
            <Button variant="outline" onClick={() => window.print()}>
              Imprimir QR Code
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QRCodesList;
