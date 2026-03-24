import { api_URL } from "./Fetcher";

export default async function getUserProfile(token: string) {
  const response = await fetch(`${api_URL}auth/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("failed to fetch user profile");
  }

  const result = await response.json();
  return result.data;
}