"use client"
import styles from "./MenuWelcome.module.css"
import { useSession } from "next-auth/react"

export default function MenuWelcome(){

    const {data:session} = useSession();
    
    return(
        <div className={styles.MenuWelcome}>
            <h1>Welcome, [{session? session.user?.name:"Visitor"}] ! </h1>
            <p>We provide one day rental of a car from various providers!</p>
        </div>
    )

}