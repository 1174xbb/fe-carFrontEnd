
import { api_URL } from "./Fetcher";
export default async function bookCar(
  providerId: string,
  bookingDate: string,
  token: string
) {
  try {
    const response = await fetch(`${api_URL}car-providers/${providerId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // session token
      },
      body: JSON.stringify({ bookingDate }), // only send bookingDate
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error booking car:", error);
    throw error;
  }
}