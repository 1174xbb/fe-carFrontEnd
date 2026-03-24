import MenuCarDisplay from "./MenuCarDisplay";
import getCars from "@/libs/getCars";
import { carData } from "../../../interfaces";
import styles from "./MenuCarCatalog.module.css"

export default async function MenuCarCatalog() {
    const cars = await getCars();

    const carDataArray: carData[] = Array.isArray(cars) ? cars : cars.data ?? [];
    const featuredCars = [...carDataArray].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <div className={styles.MenuCarCatalog}>
            <h1>Our reccomendations</h1>
            <div className={styles.carDisplayContainer}>
                <hr></hr>
                <br></br>
                
                {featuredCars.map((carItem: carData) => (
                    <MenuCarDisplay
                        key={carItem.id}
                        imagePath={carItem.imagePath}
                        carName={carItem.carName}
                        providers={carItem.name}
                        description={carItem.description}
                    />
                ))}
                <br></br>
                <hr></hr>
            </div>
            
        </div>
    );
}