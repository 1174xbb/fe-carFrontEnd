"use client";
import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import getCars from "@/libs/getCars";
import { carData, carJson } from "../../../interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";
import styles from "./Form.module.css"

export default function Form() {
  const [cars, setCars] = useState<carData[]>([]); // typed array
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [imageURL, setImageURL] = useState("");
  const [description, setCarDescription] = useState("Select a Car!");

  useEffect(() => {
    async function fetchCar() {
      try {
        const response: carJson = await getCars(); // assume getCars returns carJson
        setCars(response.data); // use the data array
      } catch (err) {
        console.error("Failed to fetch cars", err);
      }
    }

    fetchCar();
  }, []);

  function handleCarChange(e:any){
    const selectedId = e.target.value;      
    setSelectedCar(selectedId);   
    const car = cars.find((c) => c._id === selectedId); 
    setCarDescription(car ? car.description : "No description available");
    setImageURL(car? car.imagePath:"");
  }

  return (
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
                    }}
                    >
                    {cars.map((car) => (
                        <MenuItem key={car._id} value={car._id}>
                        {car.name}
                        </MenuItem>
                    ))}
                    </Select>
                    <p>{description}</p>
                </div>

                <div className={styles.PickDateContainer}>
                    <h1> 【2】Pick date!!</h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
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
            <button className={styles.Confirmation}>
                Confirm Rental!
            </button>
        </div>
    </div>
  );
}