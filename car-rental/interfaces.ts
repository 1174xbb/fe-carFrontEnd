export interface carJson{
    success:boolean,
    count:number,
    data:carData[];
}

export interface carData{
    _id:string,
    name:string,
    address:string,
    telephone:string,
    carName:string,
    description: string,
    imagePath:string,
    id:string
}
