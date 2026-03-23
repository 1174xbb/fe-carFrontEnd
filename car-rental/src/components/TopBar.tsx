import styles from "./TopBar.module.css"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default async function TopBar(){
    const session = await getServerSession(authOptions)
    return(
        <div className={styles.TopBar}>
            <ul>
                <li>Rent a car</li>
                <li>our car</li>
                <li>Logo</li>
            </ul>
            <div className={styles.username}>
                {
                    session?
                    <Link href={"/api/auth/signout"}>[{session.user?.name}]</Link>:
                    <Link href={"/api/auth/signin"}>[visitor]</Link>
                }                
            </div>
        </div>
    )
}