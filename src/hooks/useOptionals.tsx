
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
      .from("optionals")
      .select("*")
      .eq("tenant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar itens opcionais");
    } else {
      setOptionalGroups(data || []);
    }
    setIsLoading(false);
  };

  const createOptionalItem = async (values: any) => {
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
