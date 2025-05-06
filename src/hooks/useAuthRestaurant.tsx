
import { useEffect, useState } from "react";
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

        // For browser environment, use demo restaurant ID
        const demoRestaurantId = "demo-restaurant-id";
        setRestaurantId(demoRestaurantId);
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
