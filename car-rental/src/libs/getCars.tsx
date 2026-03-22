import { api_URL } from "./Fetcher";

export default async function getCars() {
    const response = await fetch (`${api_URL}car-providers`)
    if(!response.ok){
        throw new Error ("Failed to fetch cars")
    }

    const data = response.json();
    console.log(data);
    return await data;
}