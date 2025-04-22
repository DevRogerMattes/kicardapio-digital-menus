
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const KiCardapioLogo: React.FC<LogoProps> = ({ size = "md", variant = "full" }) => {
  const sizes = {
    sm: { height: "h-8", width: variant === "full" ? "w-32" : "w-8" },
    md: { height: "h-10", width: variant === "full" ? "w-40" : "w-10" },
    lg: { height: "h-16", width: variant === "full" ? "w-64" : "w-16" },
  };

  const { height, width } = sizes[size];

  return (
    <div className={`flex items-center ${width} ${height} overflow-hidden`}>
      {variant === "full" ? (
        <div className="flex items-center">
          <div className="text-kicardapio-red font-bold text-2xl flex items-center">
            <span className="text-kicardapio-orange">Ki</span>
            Cardapio
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-kicardapio-red text-white rounded-full h-full w-full font-bold">
          <span className="text-kicardapio-beige">K</span>
          <span className="text-white">C</span>
        </div>
      )}
    </div>
  );
};

export default KiCardapioLogo;
