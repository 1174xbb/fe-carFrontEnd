"use client";
import styles from "./AdminBookingCard.module.css"
import Image from "next/image";
import removeBooking from "@/libs/deleteBooking";
import { useRouter } from "next/navigation"; // ensure you are in a client component
import Link from "next/link";
import { info } from "console";


interface UserBookingCardProps {
  booking: any;
  token: string;
  onDeleted: (bookingId: string) => void;
}

export default function AdminBookingCard({ booking, token, onDeleted }: UserBookingCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    // Navigate to the booking page with query params
    router.push(
      `/booking?type=edit&bookingId=${booking._id}&carId=${booking.carProvider._id}&bookingDate=${booking.bookingDate}`
    );
  };
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this booking?")) return;

    try {
      await removeBooking(booking._id, token);
      onDeleted(booking._id); // notify parent to remove from UI
      alert("Booking removed!");
    } catch (err: any) {
      alert(`Failed to remove booking: ${err.message}`);
    }
  };

  return (
    <div className={styles.UserBookingCardContainer}>
      

      <div className={styles.CarImage}>
        <Image
        src={booking.carProvider.imagePath}
        fill ={true}
        alt="car Image"
        style={{objectFit:"cover"}}
        >

        </Image>
      </div>

      <div className={styles.Info}>
      
        <div className={styles.DateData}>
            <span  style={{fontSize:"20px"}}>User : {booking.user.name}</span>
            <div className={styles.buttonContainer}>
                <Link href={`/booking?type=edit&bookingId=${booking._id}&carId=${booking.carProvider._id}&bookingDate=${booking.bookingDate}`}>
                <button className={styles.editButton} onClick={handleEdit}>&#9998;</button></Link>
                <button className={styles.deleteButton} onClick={handleDelete}>ⓧ</button>
            </div>
        </div>

        
        <div className={styles.data}>
         <span className={styles.DateName}>
          {new Date(booking.bookingDate).toLocaleDateString()} - 
          {booking.carProvider.carName}
          </span>
          <p>{booking.carProvider.name}</p>
          <p></p>
        </div>
        
      </div>
    </div>
  );
}