import Image from "next/image";
import MenuCarCatalog from "@/components/MenuComponent/MenuCarCatalog";
import getCars from "@/libs/getCars";
import MenuWelcome from "@/components/MenuComponent/MenuWelcome";
import styles from "./page.module.css"
import MenuRental from "@/components/MenuComponent/MenuRental";

export default  function Home() {

 
  return (
    <>
    <div className={styles.MainmenuContainer}>
      <div className={styles.userContainer}>
        <MenuWelcome></MenuWelcome>
        <MenuRental></MenuRental>
      </div>
    
    <MenuCarCatalog></MenuCarCatalog>
    </div>
    </>
  );
}
