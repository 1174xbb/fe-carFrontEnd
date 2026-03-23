"use client";

import { useState, useEffect } from "react";
import UserBookingCard from "./BookingCard";
import UserEmptyCard from "./UserEmptyCard";
import styles from "./DashBoardUserBooking.module.css";
import getBookings from "@/libs/getBookings";
import { useSession } from "next-auth/react";

const MAX_BOOKINGS = 3;

export default function UserBookings() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);

  const token = session?.user.token;
  const role = session?.user.role;

  useEffect(() => {
    if (!token) return;

    async function fetchBookings() {
      try {
        const data = await getBookings(token as string);
        setBookings(data.slice(0, MAX_BOOKINGS));
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    }

    fetchBookings();
  }, [token]);

  if (!session || !token || role === "admin") return null;

  const handleDelete = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b._id !== bookingId));
  };

  const emptySlots = MAX_BOOKINGS - bookings.length;

  return (
    <div className={styles.BookingContainer}>
      {bookings.map((b) => (
        <div className={styles.userCardContainer} key={b._id}>
          <UserBookingCard booking={b} token={token} onDeleted={handleDelete} />
        </div>
      ))}

      {Array.from({ length: emptySlots }).map((_, index) => (
        <div className={styles.userCardContainer} key={index}>
          <UserEmptyCard />
        </div>
      ))}
    </div>
  );
}