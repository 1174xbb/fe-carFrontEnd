import Image from "next/image";

export default function MenuCarDisplay({imagePath,carName,providers,description}:{imagePath:string,carName:string,providers:string,description:string}){
    return(
        <>
        <div>
            <div>
                {(imagePath==="null")?
                    <></>:<Image
                    src = {imagePath}
                    width={1}
                    height={1}
                    alt="Car Image">
                    </Image>
                }
                
            </div>
            <div>
                <h2>{carName}</h2>
                <h3>{providers}</h3>
                <p>{description}</p>
            </div>
           
        </div>
        </>
    )
}