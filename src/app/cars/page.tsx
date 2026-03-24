"use client"

import DashBoardUserData from "@/components/DashBoardComponent/DashBoardUserData"
import UserBookings from "@/components/DashBoardComponent/DashBoardUserBooking"
import styles from "./page.module.css"
import CarCard from "@/components/Cars/CarCard"
import { useEffect,useState } from "react"
import { carJson } from "../../../interfaces"
import getCars from "@/libs/getCars"
import { carData } from "../../../interfaces"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"


export default function Cars(){

    const [cars, setCars] = useState<carData[]>([]);
    const [selectedCar, setSelectedCar] = useState<string>("");
    const [imageURL, setImageURL] = useState("");
    const [description, setCarDescription] = useState("Select a Car!");
    const [provider,setProvider] = useState("");
    const [location,setLocation] = useState("");
    const [Tel,setTel] = useState("");
    const [price, setPrice] = useState("");

    const searchParams = useSearchParams();  
    const preselected = searchParams.get("carID");  

    const handleCarChange = (name:string) => {
        
        console.log("selected = " + name)
        const car = cars.find((c) => c.carName === name);
        if (!car) return;
        setSelectedCar(name);
        console.log("car =" + car)
        setCarDescription(car ? car.description : "No description available");
        setImageURL(car ? car.imagePath : "");
        setProvider(car? car.name:"");
        setLocation(car? car.address:"");
        setTel(car? car.telephone:"");
        setPrice("6,000");
    };

    useEffect(() => {
        async function fetchCar() {
          try {
            const response: carJson = await getCars();
            setCars(response.data);
            console.log(cars);
          } catch (err) {
            console.error("Failed to fetch cars", err);
          }
        }
        fetchCar();
      }, []);

    useEffect(()=>{
        if(preselected){
                console.log("hascar = " + preselected)
                handleCarChange(preselected)
            }
    },[cars])
    
    return(
        <>
        <div className={styles.Header}>
            <span>our cars</span>
            
        </div>
        <div className={styles.Container}>
            <div className={styles.carListHolder}>
                <ul>
                    <hr></hr>
                {
                cars.map((car) => (
                        <li 
                        key = {car.carName}
                        onClick={()=>handleCarChange(car.carName)}
                        style={{
                            backgroundColor: selectedCar===car.carName? "#4e4b42":"hsl(50, 31%, 77%)",
                            color:selectedCar===car.carName?"hsl(50, 31%, 77%)": "#4e4b42"
                        }}
                        >
                        <button ><Image src={car.imagePath} alt ="carImage" width={50} height={50} className={styles.imagecontainer}></Image> {car.carName}</button>
                        </li>
                    ))
                    }
                    <hr></hr>
                </ul>
                
            </div>
            <div className={styles.carBasicInformation}>
                    {(selectedCar==="")?
                    (
                        <div style={{width:"100%",height:"100%",justifyContent:"center",display:"flex",alignItems:"center"}}>
                            <p>Select a car!</p>
                        </div>
                    ):(
                        <div className={styles.Infommation}>
                        <h1>{selectedCar}</h1>
                        <hr></hr>
                        <div className={styles.InfommationImage}>
                            <Image src={imageURL} alt ="carImage" fill style={{objectFit:"contain"}}></Image>
                        </div>
                        <p>{description}</p>
                        <Link href={`/booking?type=newBooking&carId=${selectedCar}`} className={styles.BookButton}><button>Rent this car!</button>
                        </Link>
                        <hr></hr>
                        </div>
                        
                    )
                }
            </div>
            <div className={styles.advanceInformation}>
                
                {(selectedCar==="")?
                    (
                        <div style={{width:"100%",height:"100%",justifyContent:"center",display:"flex",alignItems:"center",textAlign:"center",padding:"10px"}}>
                            <p>Car Infommation will be displayed here...</p>
                        </div>
                    ):(
                        <div className={styles.detailedInformation}>
                            <h1>Information</h1>
                            <hr></hr>
                            <h3>Car provider:</h3>
                            <p>{provider}</p>
                            <h3>Address :</h3>
                            <p>{location}</p>
                            <h3>Contact number :</h3>
                            <p>{Tel}</p>
                            <h3>Price</h3>
                            <p>{price} THB</p>
                            <hr></hr>
                        </div>
                        
                    )
                }

            </div>
       </div>
        </>
    )
}