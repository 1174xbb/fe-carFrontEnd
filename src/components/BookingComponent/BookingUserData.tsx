import { authOptions } from "@/libs/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import styles from "./bookingUserData.module.css"

export default async function BookingUserData() {
  
    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null 

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.createdAt);
    console.log(profile)
    return(
        <div className={styles.userProfileContainer}>
            <div className={styles.PfpImage}>placehodler</div>
            <div className={styles.userData}>
                <h1><span>{profile.name}</span></h1>
                <table>
                    <tbody>
                    <tr><td style={{textAlign:"left"}}>Tel : </td><td>{profile.telephone}</td></tr>
                    <tr><td style={{textAlign:"left"}}>Email : </td><td>{profile.email}</td></tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}