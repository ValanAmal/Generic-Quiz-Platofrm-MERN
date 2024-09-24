// Sample auth.ts API helpers

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch("https://your-api.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("API response not ok");
    }

    const data = await response.json();
    return data; // Assuming the API returns JSON { success: true/false, message: "..." }
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
    const response = await fetch("https://your-api.com/signup", {
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
