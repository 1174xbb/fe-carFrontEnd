import UserBookingCard from "./BookingCard";
import UserEmptyCard from "./UserEmptyCard";
import styles from "./DashBoardUserBooking.module.css"
import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
const MAX_BOOKINGS = 3;

export default async function UserBookings() {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const bookings = await getBookings(session.user.token);
    const role = session.user.role


    if (role === "admin") {
    return (
      <div className={styles.BookingContainer}>
        null;
      </div>
    );
  }

    const userBookings = bookings.slice(0, MAX_BOOKINGS);
    const emptySlots = MAX_BOOKINGS - userBookings.length;

    return (
        <div className={styles.BookingContainer}>
        
        {userBookings.map((b: any) => (
            <div className={styles.userCardContainer} key={b._id}>
            <UserBookingCard   booking={b} />
            </div>
        ))}

        {Array.from({ length: emptySlots }).map((_, index) => (
            <div className={styles.userCardContainer }key={index}>
            <UserEmptyCard  />
            </div>
        ))}

        </div>
    );
}