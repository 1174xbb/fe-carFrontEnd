import MenuCarDisplay from "./MenuCarDisplay";
import getCars from "@/libs/getCars";
import { carData } from "../../interfaces";

export default async function MenuCarCatalog() {
    const cars = await getCars();

    const carDataArray: carData[] = Array.isArray(cars) ? cars : cars.data ?? [];
    const featuredCars = [...carDataArray].sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <>
            <h1>Our reccomendations</h1>
            {featuredCars.map((carItem: carData) => (
                <MenuCarDisplay
                    key={carItem.id}
                    imagePath={carItem.imagePath}
                    carName={carItem.carName}
                    providers={carItem.name}
                    description={carItem.description}
                />
            ))}
        </>
    );
}