import { api_URL } from "./Fetcher"

export default async function userLogin(userEmail:string, userPassword:string) {
    const response = await fetch(`${api_URL}auth/login`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            email:userEmail,
            password: userPassword,
        })
    } )
    if (!response.ok){
        throw new Error ("Failed to log in")
    }
    
    return await response.json()
}