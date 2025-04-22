
import React from "react";
import { useParams } from "react-router-dom";
import { TableQR } from "@/types/models";
import { getTenantBySlug, tableQRs } from "@/data/mockData";
import TableQRCode from "@/components/qrcode/TableQRCode";
import MainNavigation from "@/components/navigation/MainNavigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QRCodePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const tenant = getTenantBySlug(slug || "");
  
  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Restaurante não encontrado</h1>
        <p className="text-muted-foreground mb-6">
          O restaurante que você está procurando não existe ou foi removido.
        </p>
        <Button asChild>
          <Link to="/">Voltar para o início</Link>
        </Button>
      </div>
    );
  }

  // Filter table QR codes for this tenant
  const tenantQRs = tableQRs.filter(qr => qr.tenantId === tenant.id);

  return (
    <div className="min-h-screen">
      <MainNavigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">{tenant.name}</h1>
        <p className="text-muted-foreground mb-8">QR Codes para mesas</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tenantQRs.map((tableQR) => (
            <TableQRCode
              key={tableQR.id}
              tableQR={tableQR}
              restaurantName={tenant.name}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default QRCodePage;
