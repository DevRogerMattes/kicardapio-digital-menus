
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";
import { toast } from "sonner";

export function useOptionals() {
  const restaurantId = useAuthRestaurant();
  const [optionalGroups, setOptionalGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;
    loadOptionals();
  }, [restaurantId]);

  const loadOptionals = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("option_groups")
      .select("*")
      .eq("tenant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar opcionais");
    } else {
      setOptionalGroups(data || []);
    }
    setIsLoading(false);
  };

  const createOptionalGroup = async (values: any) => {
    const { error } = await supabase.from("option_groups").insert([
      {
        ...values,
        tenant_id: restaurantId,
      },
    ]);

    if (error) {
      toast.error("Erro ao criar grupo de opcionais");
      return false;
    }

    toast.success("Grupo de opcionais criado com sucesso!");
    loadOptionals();
    return true;
  };

  return {
    optionalGroups,
    isLoading,
    createOptionalGroup,
    reload: loadOptionals,
  };
}
