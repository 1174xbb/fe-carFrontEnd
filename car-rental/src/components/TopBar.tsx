"use client"

import styles from "./TopBar.module.css"
import TopBarItem from "./TopBarItem"
import { useSession, signIn, signOut } from "next-auth/react"

export default function TopBar() {
    const { data: session } = useSession()

    return (
        <div className={styles.TopBar}>
            <ul>
                <TopBarItem url="/booking?type=newBooking" name="Rent a car" />
                <TopBarItem url="/booking" name="Our car" />
                <TopBarItem url="/" name="Logo" />
            </ul>

            <div className={styles.username}>
                {session ? (
                    <span
                        onClick={() => signOut()}
                        style={{ cursor: "pointer" }}
                    >
                        [{session.user?.name}]
                    </span>
                ) : (
                    <span
                        onClick={() => signIn()}
                        style={{ cursor: "pointer" }}
                    >
                        [visitor]
                    </span>
                )}
            </div>
        </div>
    )
}