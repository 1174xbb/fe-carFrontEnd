import Image from "next/image"

export default function CarCard({carName,carImg,carDescription}:{carName:string,carImg:string,carDescription:string}){
    return(
        <>
        <div>
            <h1>{carName}</h1>
            <Image
            src={carImg}
            alt="carImage"
            fill
            ></Image>
            <p>{carDescription}</p>
        </div>
        </>
    )
}