import { useSession, signIn, signOut } from "next-auth/react"
import styles from "./SubMenu.module.css"
import Link from "next/link";

export default function SubMenu(){

    const { data: session } = useSession()
  
    return (
        <div className={styles.SubMenuContainer}>
            <ul>    
                {session?
                (
                    <>
                        <li><Link href="/dashboard">DashBoard</Link></li>
                        <li onClick={() => signOut({ callbackUrl: "/" })}>SignOut</li>
                    </>
                ):
                (
                    <>
                        <li><Link href="/api/auth/signin?callbackUrl=/dashboard">Login</Link></li>
                        <li><Link href="/signup">SignUp</Link></li>
                    </>
                )
                }
            </ul>
        </div>
    );
}