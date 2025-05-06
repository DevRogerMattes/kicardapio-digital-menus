
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";
import { toast } from "sonner";

interface OptionalGroup {
  id: string;
  name: string;
  description?: string;
  min_selection: number;
  max_selection: number;
  price?: number;
  tenant_id: string;
}

export function useOptionals() {
  const restaurantId = useAuthRestaurant();
  const [optionalGroups, setOptionalGroups] = useState<OptionalGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;
    loadOptionals();
  }, [restaurantId]);

  const loadOptionals = async () => {
    if (!restaurantId) return;
    setIsLoading(true);
    
    supabase
      .from("optionals")
      .select("*")
      .eq("tenant_id", restaurantId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast.error("Erro ao carregar itens opcionais");
        } else {
          setOptionalGroups(data || []);
        }
        setIsLoading(false);
      });
  };

  const createOptionalItem = async (values: any) => {
    // Validate that max_selection is greater than or equal to min_selection
    if (values.max_selection < values.min_selection) {
      toast.error("O valor máximo deve ser maior ou igual ao valor mínimo");
      return false;
    }

    const { error } = await supabase.from("optionals").insert([
      {
        ...values,
        tenant_id: restaurantId,
      },
    ]);

    if (error) {
      toast.error("Erro ao criar item opcional");
      return false;
    }

    toast.success("Item opcional criado com sucesso!");
    loadOptionals();
    return true;
  };

  return {
    optionalGroups,
    isLoading,
    createOptionalItem,
    reload: loadOptionals,
  };
}
