import { api_URL } from "./Fetcher"; // must be full backend URL, e.g., "http://localhost:5000/api/v1"

export default async function removeBooking(bookingId: string, token: string) {
  try {
    const response = await fetch(`${api_URL}bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // required for req.user
      },
    });

    // read body once
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Server returned non-JSON: ${text}`);
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove booking");
    }

    return data;
  } catch (error) {
    console.error("Error removing booking:", error);
    throw error;
  }
}