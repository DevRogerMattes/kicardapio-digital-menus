
import { executeQuery, insert, querySingle } from "./mysql";
import { toast } from "sonner";
import bcryptjs from "bcryptjs";

// User type definition
export interface User {
  id: string;
  email: string;
}

// Get the current logged in user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("currentUser");
  return userJson ? JSON.parse(userJson) : null;
};

// Login with email and password
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Find user by email
    const user = await querySingle<{ id: string; email: string; password_hash: string }>(
      "SELECT id, email, password_hash FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return { user: null, error: "E-mail ou senha inválidos" };
    }

    // Compare password hash
    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return { user: null, error: "E-mail ou senha inválidos" };
    }

    // Create user object without sensitive info
    const safeUser: User = {
      id: user.id,
      email: user.email,
    };

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(safeUser));

    return { user: safeUser, error: null };
  } catch (error) {
    console.error("Login error:", error);
    return { user: null, error: "Erro ao fazer login" };
  }
};

// Register new user
export const registerUser = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Check if user already exists
    const existingUser = await querySingle<{ id: string }>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser) {
      return { user: null, error: "Este e-mail já está sendo utilizado" };
    }

    // Generate unique ID
    const userId = crypto.randomUUID();
    
    // Hash password
    const passwordHash = await bcryptjs.hash(password, 10);

    // Insert into database
    await insert("users", {
      id: userId,
      email,
      password_hash: passwordHash
    });

    // Create user object
    const newUser: User = {
      id: userId,
      email,
    };

    return { user: newUser, error: null };
  } catch (error) {
    console.error("Registration error:", error);
    return { user: null, error: "Erro ao registrar usuário" };
  }
};

// Logout
export const logout = (): void => {
  localStorage.removeItem("currentUser");
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getCurrentUser();
};

// Create or link restaurant for user
export const linkUserToRestaurant = async (
  userId: string,
  restaurantId: string,
  role: "owner" | "manager" | "staff" = "owner"
): Promise<boolean> => {
  try {
    // Check if link already exists
    const existingLink = await querySingle(
      "SELECT id FROM restaurants_users WHERE user_id = ? AND restaurant_id = ?",
      [userId, restaurantId]
    );

    if (existingLink) {
      // Already linked
      return true;
    }

    // Create new link
    const linkId = crypto.randomUUID();
    await insert("restaurants_users", {
      id: linkId,
      user_id: userId,
      restaurant_id: restaurantId,
      role
    });

    return true;
  } catch (error) {
    console.error("Error linking user to restaurant:", error);
    return false;
  }
};
