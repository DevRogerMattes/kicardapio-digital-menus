
import React from "react";
import MainNavigation from "@/components/navigation/MainNavigation";
import PricingPlans from "@/components/home/PricingPlans";
import Footer from "@/components/home/Footer";

const PlansPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Planos e Preços</h1>
            <p className="text-muted-foreground">
              Escolha o plano ideal para o seu estabelecimento. Todos os planos incluem
              atualizações gratuitas e não possuem taxas ocultas.
            </p>
          </div>
        </div>
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
};

export default PlansPage;
