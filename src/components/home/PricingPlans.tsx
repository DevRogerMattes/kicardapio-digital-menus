
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Grátis",
    price: "R$ 0",
    period: "para sempre",
    description: "Ideal para estabelecimentos pequenos que estão começando.",
    features: [
      "Até 25 produtos",
      "1 cardápio digital",
      "QR codes para 5 mesas",
      "Cores personalizadas",
      "Suporte por email"
    ],
    buttonText: "Começar Grátis",
    buttonVariant: "outline"
  },
  {
    name: "Pro",
    price: "R$ 49,90",
    period: "por mês",
    description: "Perfeito para restaurantes de médio porte com cardápio diversificado.",
    features: [
      "Até 100 produtos",
      "2 cardápios digitais",
      "QR codes para 30 mesas",
      "Cores e temas personalizados",
      "Remoção de marca KiCardapio",
      "Domínio personalizado",
      "Suporte prioritário"
    ],
    buttonText: "Assinar Plano Pro",
    buttonVariant: "default",
    popular: true
  },
  {
    name: "Premium",
    price: "R$ 99,90",
    period: "por mês",
    description: "Solução completa para estabelecimentos de grande porte.",
    features: [
      "Produtos ilimitados",
      "5 cardápios digitais",
      "QR codes ilimitados",
      "Personalização completa",
      "API de integração",
      "Múltiplos idiomas",
      "Suporte 24/7",
      "Relatórios avançados"
    ],
    buttonText: "Assinar Plano Premium",
    buttonVariant: "outline"
  }
];

const PricingPlans: React.FC = () => {
  return (
    <section className="py-16" id="planos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Planos simples e transparentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu estabelecimento, sem taxas escondidas 
            e com todos os recursos necessários para o seu sucesso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col h-full border ${plan.popular ? 'border-kicardapio-red ring-2 ring-kicardapio-red/20' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-kicardapio-red text-white text-xs px-2 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-kicardapio-red shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.buttonVariant as any} asChild>
                  <Link to="/cadastro">{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
