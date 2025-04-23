
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ProductObservationsProps {
  defaultObservations: string[];
  onAddObservation: (observation: string) => void;
  onRemoveObservation: (index: number) => void;
  customObservation: string;
  onCustomObservationChange: (value: string) => void;
}

const ProductObservations: React.FC<ProductObservationsProps> = ({
  defaultObservations,
  onAddObservation,
  onRemoveObservation,
  customObservation,
  onCustomObservationChange,
}) => {
  const [newObservation, setNewObservation] = React.useState("");

  const handleAddObservation = () => {
    if (newObservation.trim()) {
      onAddObservation(newObservation.trim());
      setNewObservation("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Observações Pré-cadastradas</Label>
        <div className="flex gap-2 items-end mb-2">
          <Input
            value={newObservation}
            onChange={(e) => setNewObservation(e.target.value)}
            placeholder="Nova observação pré-cadastrada"
          />
          <Button type="button" onClick={handleAddObservation}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {defaultObservations.map((obs, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span className="text-sm">{obs}</span>
              <button
                type="button"
                onClick={() => onRemoveObservation(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Observação Personalizada</Label>
        <Textarea
          value={customObservation}
          onChange={(e) => onCustomObservationChange(e.target.value)}
          placeholder="Digite uma observação personalizada..."
        />
      </div>
    </div>
  );
};

export default ProductObservations;
