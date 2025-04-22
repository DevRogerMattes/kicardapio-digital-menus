
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";

export function useOptionals() {
  const restaurantId = useAuthRestaurant();
  const [optionals, setOptionals] = useState([]);

  useEffect(() => {
    if (!restaurantId) return;
    supabase
      .from("optionals")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .then(({ data }) => setOptionals(data || []));
  }, [restaurantId]);

  return { optionals };
}
