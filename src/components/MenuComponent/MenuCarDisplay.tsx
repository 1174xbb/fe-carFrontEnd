"use client";

import Image from "next/image";
import styles from "./MenuCarDisplay.module.css";
import { useRouter } from "next/navigation";

export default function MenuCarDisplay({
  imagePath,
  carName,
  providers,
  description
}: {
  imagePath: string;
  carName: string;
  providers: string;
  description: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cars?carID=${carName}`);
  };

  return (
    <div className={styles.carCardContainer} onClick={handleClick} style={{cursor: "pointer"}}>
      <div className={styles.imageContainer}>
        <Image
          src={imagePath}
          fill
          alt="Car Image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.infoContainer}>
        <h2>
          <span style={{ fontSize: "65px" }}>&#9632;</span> {carName}
        </h2>
        <h3>{providers}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}