import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";

export const createOrder = createAsyncThunk<void, undefined, {state: RootState}>(
    'cart/create',
    async (_, thunkAPI) => {

        const objData = thunkAPI.getState().cart.newObj;

        if(Object.keys(objData).length !== 0) {
            await axiosApi.post('/ordersPizza.json', objData);
        }
    }
);