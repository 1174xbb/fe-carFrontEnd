"use client"

import styles from "./TopBar.module.css"
import TopBarItem from "./TopBarItem"
import { useSession, signIn, signOut } from "next-auth/react"
import SubMenu from "./SubMenu"
import { useState } from "react"

export default function TopBar() {
    const { data: session } = useSession()
    const [subMenuOpen,setSubMenuOpen] = useState(false);

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
                        onClick={()=>setSubMenuOpen(!subMenuOpen)}
                    >
                        [{session.user?.name}]
                        {subMenuOpen && <SubMenu/>}
                        
                    </span>
                ) : (
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={()=>setSubMenuOpen(!subMenuOpen)}
                    >
                        [visitor]
                        <div style={{
                            display:(subMenuOpen)?"block":"hidden"
                        }}>
                            {subMenuOpen && <SubMenu/>}
                        </div>
                    </span>
                )}
            </div>
        </div>
    )
}