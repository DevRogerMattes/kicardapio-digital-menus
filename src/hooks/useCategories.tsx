import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuthRestaurant } from "./useAuthRestaurant";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
