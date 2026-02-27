const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("CRITICAL: EXPO_PUBLIC_API_URL is missing in .env");
}

export const fetchInventory = async () => {
  try {
    // Clean and simple. No hardcoded ports or protocols.
    const response = await fetch(`${BASE_URL}/inventory`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};