import { api_URL } from "./Fetcher";

interface UpdateBookingBody {
  bookingDate?: string;
  // add other editable fields here if needed
}

export default async function updateBooking(
  bookingId: string,
  data: UpdateBookingBody,
  token: string
) {
  try {
    const response = await fetch(`${api_URL}bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Handle non-OK responses
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(`Server returned non-JSON status ${response.status}`);
      }
      throw new Error(errorData.message || "Failed to update booking");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}