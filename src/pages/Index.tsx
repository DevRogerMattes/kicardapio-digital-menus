
import React from "react";
import MainNavigation from "@/components/navigation/MainNavigation";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PricingPlans from "@/components/home/PricingPlans";
import Footer from "@/components/home/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <main className="flex-grow mt-16">
        <Hero />
        <Features />
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
