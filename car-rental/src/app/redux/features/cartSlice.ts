import { createSlice } from "@reduxjs/toolkit";
import { BookingItem } from "../../../../interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

type CartState = {
    carItems: BookingItem[]
}

const initialState:CartState={carItems : []}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addBooking:(state,action:PayloadAction<BookingItem>)=>{
            state.carItems.push(action.payload)
        },
        removeBooking:(state,action:PayloadAction<BookingItem>)=>{
            const remainItems = state.carItems.filter(obj=>{
                return ((obj.user_id !== action.payload.user_id))|| 
                        (obj.bookingdate !== action.payload.bookingdate)||
                        (obj.car_id !== action.payload.car_id);
            })
            state.carItems = remainItems
        }
    }
})

export const {addBooking,removeBooking} = cartSlice.actions;
export default cartSlice.reducer;