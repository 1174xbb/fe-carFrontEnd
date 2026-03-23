import styles from "./UserEmptyCard.module.css"
import Link from "next/link";

export default function UserEmptyCard() {
  return (
    <div className={styles.UserEmptyCard}>
      <div className={styles.Empty}>
        <p>No rental</p>
      </div>
      <Link href="/booking?type=newBooking"><button className={styles.Button}>Make a rent?</button></Link>
      
    </div>
  );
}