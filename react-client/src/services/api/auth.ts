// Sample auth.ts API helpers
import { API_URL } from "./constant";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result= await response.json()
    if (result.userId){
      localStorage.setItem('token',result.userId);
    }
    if (!response.ok) {
      throw new Error("API response not ok");
    }

    return result; // Assuming the API returns JSON { success: true/false, message: "..." }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Login failed. Please try again." };
  }
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("API response not ok");
    }

    const data = await response.json();
    return data; // Assuming the API returns JSON { success: true/false, message: "..." }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Sign Up failed. Please try again." };
  }
};
