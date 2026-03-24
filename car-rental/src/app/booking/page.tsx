"use client";

import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import getCars from "@/libs/getCars";
import { BookingItem, carData, carJson } from "../../../interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs,{ Dayjs } from "dayjs";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addBooking } from "../redux/features/cartSlice";
import { useSession } from "next-auth/react";
import bookCar from "@/libs/bookCar";
import updateBooking from "@/libs/updateBooking";
import { api_URL } from "@/libs/Fetcher";

export default function BookingPage() {
  const urlParams = useSearchParams();
  const type = urlParams.get("type");
  const bookingId = urlParams.get("bookingId");
  const preselectedCarId = urlParams.get("carId"); 

  const { data: session } = useSession();
  const router = useRouter();

  const token = session?.user.token || "";
  const userID = session?.user._id || "";

  const [cars, setCars] = useState<carData[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [imageURL, setImageURL] = useState("");
  const [description, setCarDescription] = useState("Select a Car!");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Fetch all cars
  useEffect(() => {
    async function fetchCar() {
      try {
        const response: carJson = await getCars();
        setCars(response.data);
      } catch (err) {
        console.error("Failed to fetch cars", err);
      }
    }
    fetchCar();
  }, []);

  useEffect(() => {
    if (preselectedCarId && cars.length > 0) {
      const car = cars.find(c => c.carName === preselectedCarId);
      if (car) {
        setSelectedCar(car._id);
        setCarDescription(car.description);
        setImageURL(car.imagePath);
      }
    }
  }, [preselectedCarId, cars]);

  // Fetch existing booking if editing
  useEffect(() => {
    console.log("has reached")
  if (type === "edit" && bookingId && token) {
    async function fetchBooking() {
      try {
        console.log("editing booking");
        const res = await fetch(`${api_URL}bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch booking");
        const data = await res.json();
        setSelectedCar(data.data.carProvider._id);
        setBookingDate(dayjs(data.data.bookingDate)); // use dayjs(), not new
        setImageURL(data.data.carProvider.imagePath);
        setCarDescription(data.data.carProvider.description);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBooking();
  }
}, [type, bookingId, token]);

  const handleCarChange = (e: any) => {
    const selectedId = e.target.value;
    setSelectedCar(selectedId);
    const car = cars.find((c) => c._id === selectedId);
    setCarDescription(car ? car.description : "No description available");
    setImageURL(car ? car.imagePath : "");
  };

  const handleSubmit = async () => {
    if (!selectedCar || !bookingDate) {
      alert("Please select a car and date!");
      return;
    }
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    try {
      if (type === "newBooking") {
        await bookCar(selectedCar, bookingDate.format("YYYY/MM/DD"), token);
        const item: BookingItem = {
          car_id: selectedCar,
          bookingdate: bookingDate.format("YYYY/MM/DD"),
          user_id: userID,
        };
        dispatch(addBooking(item));
      } else if (type === "edit" && bookingId) {
        await updateBooking(bookingId, { bookingDate: bookingDate.format("YYYY/MM/DD") }, token);
      }

      alert("Booking saved!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(`Booking failed: ${err.message || "Server error"}`);
    }
  };
    return (
    <>
        <div className={styles.Rental}>
            {(type === "newBooking")?
                (
                    <h1>new Rental</h1>
                )
                :
                (
                    <h1>edit your Rental</h1>
                )
            }
        </div>
        <div className={styles.FormContainer}>
        <div className={styles.CarImage}>
            {imageURL===""?
            (<p>Your car Image goes here...</p>)
            :(
                <Image
                src = {imageURL}
                fill
                alt = "carImage"
                style={{objectFit:"cover"}}

            >
            </Image>
            )

            }
        </div>

        <div className={styles.interactionContainer}>
            <div className={styles.InfoContainer}>
                <div className={styles.PickCarContainer}>
                    <h1> 【1】Pick your car!!</h1>
                    <Select
                    variant="standard"
                    id="CarChoice"
                    value={selectedCar ?? ""}
                    onChange={(e) =>handleCarChange(e) }
                    sx={{
                        width: "100%",
                        color: "hsl(45, 8%, 28%)",        
                        fontFamily: "'Jura', sans-serif",    
                        fontWeight: "bold",                      
                        fontSize: "16px",                     
                        '& .MuiSvgIcon-root': {
                        color: "hsl(45, 8%, 28%)",        
                        },
                        '& .MuiSelect-select': {
                        padding: "10px 12px",
                        },
                        backgroundColor: type === "edit" ? "#b2ac95" : "transparent",
                        pointerEvents: type === "edit" ? "none" : "auto",
                    }}
                    >
                    {cars.map((car) => (
                        <MenuItem key={car._id} value={car._id}>
                        {car.carName}
                        </MenuItem>
                    ))}
                    </Select>
                    <p>{description}</p>
                </div>

                <div className={styles.PickDateContainer}>
                    <h1> 【2】Pick date!!</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            value={bookingDate}
                            onChange={(value)=>{setBookingDate(value)}}
                            sx={{
                                width: "100%",
                                color: "hsl(45, 8%, 28%)",        
                                fontFamily: "'Jura', sans-serif",    
                                fontWeight: "bold",                      
                                fontSize: "16px",                     
                                '& .MuiSvgIcon-root': {
                                color: "hsl(45, 8%, 28%)",        
                                },
                                '& .MuiSelect-select': {
                                padding: "10px 12px",
                                },
                            }}
                    ></DatePicker>
                    </LocalizationProvider>
                    <p>You can rent our car for a day, pick up time can be any, but you must return before closing time</p>
                </div>
            </div>
            <button className={styles.Confirmation} onClick={handleSubmit}>
                {type=="edit"?
                "✎ Confirm Edit"
                :
                "☑ Confirm Rental!"

                }
            </button>
        </div>
    </div>
    </>
  );
}
