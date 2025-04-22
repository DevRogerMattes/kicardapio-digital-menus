
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function useAuthRestaurant() {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [configError, setConfigError] = useState<boolean>(false);

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase is not properly configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.");
      setConfigError(true);
      return;
    }

    const getUserRestaurant = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user;
      if (!user) return;
      // Buscar o restaurant_id do user - normalmente em profile do usuário
      const { data, error } = await supabase
        .from("restaurants_users")
        .select("restaurant_id")
        .eq("user_id", user.id)
        .single();
      if (!error && data) setRestaurantId(data.restaurant_id);
    };
    getUserRestaurant();
  }, []);

  return restaurantId;
}
