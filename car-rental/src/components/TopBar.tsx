"use client"

import styles from "./TopBar.module.css"
import TopBarItem from "./TopBarItem"
import { useSession, signIn, signOut } from "next-auth/react"
import SubMenu from "./SubMenu"

export default function TopBar() {
    const { data: session } = useSession()

    return (
        <div className={styles.TopBar}>
            <ul>
                <TopBarItem url="/booking?type=newBooking" name="Rent a car" />
                <TopBarItem url="/cars" name="Our car" />
                <TopBarItem url="/" name="Home" />
            </ul>

            <div className={styles.username}>
                {/*onClick={() => signOut()}*/}
                {/*onClick={() => signIn()}*/}
                {session ? (
                    <span
                        
                        style={{ cursor: "pointer" }}
                    >
                        [{session.user?.name}]
                    </span>
                ) : (
                    <span
                        style={{ cursor: "pointer" }}
                    >
                        [visitor]
                    </span>
                )}
            </div>
        </div>
    )
}