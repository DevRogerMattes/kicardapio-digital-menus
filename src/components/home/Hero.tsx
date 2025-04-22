
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-kicardapio-orange to-kicardapio-red pt-24 pb-16 md:pt-32 md:pb-24 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transforme seu cardápio em uma experiência digital completa
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            KiCardapio é a plataforma SaaS que permite criar cardápios digitais
            personalizados para seu restaurante, bar ou lanchonete em minutos, com
            QR codes para suas mesas e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-kicardapio-red hover:bg-white/90"
              asChild
            >
              <Link to="/cadastro">Começar Grátis</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/demo/pizzaria-do-joao">Ver Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute right-0 bottom-0 w-1/3 h-full">
        <div className="relative h-full w-full">
          <div className="absolute right-0 bottom-0 w-full h-full bg-white/10 backdrop-blur-sm rounded-tl-3xl overflow-hidden">
            <div className="p-6">
              <div className="rounded-lg bg-white/90 shadow-lg p-4">
                <div className="flex items-center gap-3 border-b pb-2 mb-3">
                  <div className="w-10 h-10 bg-kicardapio-red rounded-full flex items-center justify-center text-white font-bold">
                    KC
                  </div>
                  <div>
                    <h3 className="font-bold text-kicardapio-red">Pizzaria do João</h3>
                    <p className="text-xs text-gray-500">Mesa 01</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pizza Margherita</span>
                    <span className="text-sm font-bold text-kicardapio-red">R$ 45,90</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pizza Calabresa</span>
                    <span className="text-sm font-bold text-kicardapio-red">R$ 49,90</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Suco Natural</span>
                    <span className="text-sm font-bold text-kicardapio-red">R$ 10,90</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
