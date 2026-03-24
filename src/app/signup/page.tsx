"use client"

import styles from "./page.module.css"
import { useState } from "react"
import { registerUser } from "@/libs/registerUser";
import { useRouter } from "next/navigation";

export default function SignUp(){
    
    const router = useRouter();
    const [username,setUserName] = useState("");
    const [phonenumber,setPhone] = useState("");
    const [email,setMail] = useState("");
    const [password,SetPass] = useState("");

    async function handleSent() {
    if (!username || !phonenumber || !email || !password) {
        alert("Please fill out all the fields");
        return;
    }

    try {
        const data = await registerUser({
            name: username,
            telephone: phonenumber,
            email: email,
            password: password,
            role: "user"
        });

        alert("User registered successfully!");
        router.push("/");


    } catch (error:any) {
        alert(error.message);
        console.error(error);
    }
}

    return(
        <>
        <div className={styles.Header}>
            <span>sign up</span>        
       </div>
       <div className={styles.FormContainer}>
            <div className={styles.ContentContainer}>
                <p className={styles.Required}>Username: </p>
                <input type = "text"
                placeholder="Username"
                onChange={(e)=>setUserName(e.target.value)}
                >
                </input>
                <p className={styles.Required}>Phone number: </p>
                <input type = "tel"
                placeholder="xxxxxxxxxx"
                onChange={(e)=>setPhone(e.target.value)}
                ></input>
                <p className={styles.Required}>Email : </p>
                <input type = "email"
                placeholder="email@example.com"
                onChange={(e)=>setMail(e.target.value)}
                >
                </input>
                <p className={styles.Required}>Password : </p>
                <input type="password"
                placeholder="(At least 6 characters)"
                onChange={(e)=>SetPass(e.target.value)}
                >
                </input>
                <div className={styles.RegisterButton}>
                <button onClick={()=>handleSent()}>
                    Register
                </button>
                </div>
            </div>
       </div>
        </>
    )
}