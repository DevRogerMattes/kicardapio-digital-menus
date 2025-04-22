
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Utiliza o ambiente configurado pelo Lovable/Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useAuthRestaurant() {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  useEffect(() => {
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
