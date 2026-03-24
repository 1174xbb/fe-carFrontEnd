"use client"
import styles from "./MenuRental.module.css"
import { useSession } from "next-auth/react"

export default function MenuRental(){
    const {data:session} = useSession()
    return(
        <div className={styles.MenuRentalContainer}>
            <hr></hr><br></br>
            <h2>{session?
            "■ What journey you want to embark today?":
            "■ to start renting, login or signup"
            }</h2>
            <br></br><hr></hr>
            
        </div>
    )
}