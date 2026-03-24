import DashBoardUserData from "@/components/DashBoardComponent/DashBoardUserData"
import UserBookings from "@/components/DashBoardComponent/DashBoardUserBooking"
import styles from "./page.module.css"

export default function DashBoard(){
    return(
        <>
        <div className={styles.Header}>
            <span>dashboard&#11163;</span>
            
        </div>
        <div className={styles.dashBoardContainer}>
            <DashBoardUserData></DashBoardUserData>
            <UserBookings></UserBookings>
        </div>
        </>
    )
}