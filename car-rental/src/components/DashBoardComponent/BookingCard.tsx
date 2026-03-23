"use client";
import styles from "./BookingCard.module.css"
import Image from "next/image";
import removeBooking from "@/libs/deleteBooking";

interface UserBookingCardProps {
  booking: any;
  token: string;
  onDeleted: (bookingId: string) => void;
}
export default function UserBookingCard({ booking, token, onDeleted }: UserBookingCardProps) {
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
      <div className={styles.buttonContainer}>
          <button className={styles.editButton}>&#9998;</button>
          <button className={styles.deleteButton} onClick={handleDelete}>ⓧ</button>
      </div>

      <div className={styles.CarImage}>
        <Image
        src={booking.carProvider.imagePath}
        fill ={true}
        alt="car Image"
        style={{objectFit:"cover"}}
        >

        </Image>
      </div>

      <div >
        <h1 className={styles.DateData}>
          {new Date(booking.bookingDate).toLocaleDateString()}
        </h1>
        <div className={styles.DateName}>
          <p  style={{fontSize:"20px"}}> {booking.carProvider.carName}</p>
        </div>
        <div className={styles.data}>
          <p><strong>{booking.carProvider.name}</strong></p>
          
          <p>{booking.carProvider.telephone}</p>
        </div>
        
      </div>
    </div>
  );
}