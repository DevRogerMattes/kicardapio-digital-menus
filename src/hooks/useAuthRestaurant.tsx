
import { useEffect, useState } from "react";
import { querySingle } from "@/lib/mysql";
import { toast } from "sonner";

// Simple session management
// In a real application, you would use a more secure method like JWT
const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export function useAuthRestaurant() {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRestaurant = async () => {
      try {
        const user = getCurrentUser();
        if (!user || !user.id) {
          setLoading(false);
          return;
        }

        // Get restaurant_id from restaurants_users table
        const userRestaurant = await querySingle(
          `SELECT restaurant_id FROM restaurants_users WHERE user_id = ?`,
          [user.id]
        );

        if (userRestaurant) {
          setRestaurantId(userRestaurant.restaurant_id);
        }
      } catch (error) {
        console.error("Error fetching restaurant ID:", error);
        toast.error("Erro ao buscar informações do restaurante");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRestaurant();
  }, []);

  return restaurantId;
}
