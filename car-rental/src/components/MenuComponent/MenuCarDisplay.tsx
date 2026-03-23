import Image from "next/image";
import styles from "./MenuCarDisplay.module.css"

export default function MenuCarDisplay({imagePath,carName,providers,description}:{imagePath:string,carName:string,providers:string,description:string}){
    return(
        <>
        <div>
            <div className={styles.carCardContainer}>
                <div className={styles.imageContainer}>
                    <Image 
                    src = {imagePath}
                    fill ={true}
                    alt="Car Image"
                    style={{objectFit:"cover"}}>
                    </Image>
                </div>
                <div className={styles.infoContainer}>
                    <h2><span style={{fontSize:"65px"}}>&#9632;</span> {carName}</h2>
                    <h3>{providers}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
        </>
    )
}