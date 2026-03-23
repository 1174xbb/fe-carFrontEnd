"use client";
import styles from "./BookingCard.module.css"
import Image from "next/image";

export default function UserBookingCard({ booking }: any) {
  return (
    <div className={styles.UserBookingCardContainer}>
      <div className={styles.buttonContainer}>
          <button className={styles.editButton}>&#9998;</button>
          <button className={styles.deleteButton}>ⓧ</button>
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