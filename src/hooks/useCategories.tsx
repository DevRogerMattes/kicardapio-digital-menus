
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthRestaurant } from "./useAuthRestaurant";

export function useCategories() {
  const restaurantId = useAuthRestaurant();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!restaurantId) return;
    supabase
      .from("categories")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .then(({ data }) => setCategories(data || []));
  }, [restaurantId]);

  return { categories };
}
