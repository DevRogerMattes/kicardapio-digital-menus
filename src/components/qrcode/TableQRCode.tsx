
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableQR } from "@/types/models";

interface TableQRCodeProps {
  tableQR: TableQR;
  restaurantName: string;
}

const TableQRCode: React.FC<TableQRCodeProps> = ({ tableQR, restaurantName }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-center">
          Mesa {tableQR.tableNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <img 
            src={tableQR.qrCodeUrl} 
            alt={`QR code para mesa ${tableQR.tableNumber}`} 
            className="mx-auto w-40 h-40"
          />
        </div>
        <p className="text-sm text-muted-foreground mb-2">{restaurantName}</p>
        <p className="text-xs text-muted-foreground">
          Escaneie para acessar o cardápio digital
        </p>
      </CardContent>
    </Card>
  );
};

export default TableQRCode;
