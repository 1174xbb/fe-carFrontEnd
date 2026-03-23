import { api_URL } from "./Fetcher";

export default async function getBookings(token: string) {
  const response = await fetch(`${api_URL}bookings`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("failed to fetch bookings");
  }

  const result = await response.json();
  return result.data; 
}