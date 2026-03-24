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


export interface LoginUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface JWTToken {
  id: string;
  token: string;
}

export interface SessionUser {
  id: string;
  token?: string;
  name: string;
  email: string;
}

export interface Booking {
  _id: string;
  user:{
    _id:string;
    name:string;
  };
  carProvider: {
    name: string;
    address: string;
    telephone: string;
  };
  bookingDate: string;
}

export interface BookingItem{
  car_id: string
  bookingdate: string
  user_id: string

}