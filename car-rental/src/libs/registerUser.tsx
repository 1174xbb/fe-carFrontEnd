import { api_URL } from "./Fetcher";
import { RegisterUserData } from "../../interfaces";

export async function registerUser(userData:RegisterUserData) {
    const response = await fetch(`${api_URL}auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Register failed");
    }

    return data;
}