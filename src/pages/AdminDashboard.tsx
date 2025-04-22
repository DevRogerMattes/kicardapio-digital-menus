
import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTenantById } from "@/data/mockData";

const AdminDashboard: React.FC = () => {
  // Using the first tenant from mock data for demonstration
  const tenant = getTenantById("1");

  if (!tenant) {
    return <div>Tenant not found</div>;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-64 fixed inset-y-0 z-50 hidden md:flex">
        <DashboardSidebar />
      </div>
      <div className="md:pl-64 w-full">
        <main className="p-6">
          <DashboardHeader tenant={tenant} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Produtos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Categorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  QR Codes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Visualizações Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Visão Geral do Cardápio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-muted-foreground">
                  <p>Gráfico de visualizações ao longo do tempo</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Produtos Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Pizza Margherita</p>
                      <p className="text-sm text-muted-foreground">24 visualizações</p>
                    </div>
                    <span className="text-kicardapio-red font-medium">R$ 45,90</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Pizza Calabresa</p>
                      <p className="text-sm text-muted-foreground">19 visualizações</p>
                    </div>
                    <span className="text-kicardapio-red font-medium">R$ 49,90</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Refrigerante - Lata</p>
                      <p className="text-sm text-muted-foreground">15 visualizações</p>
                    </div>
                    <span className="text-kicardapio-red font-medium">R$ 6,90</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
