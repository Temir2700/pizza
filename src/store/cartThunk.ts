import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {AppDispatch, RootState} from "../app/store";
import { IOrder} from "../types";

export const createOrder = createAsyncThunk<void, undefined, {state: RootState}>(
    'cart/create',
    async (_, thunkAPI) => {

        const objData = thunkAPI.getState().cart.newObj;

        if(objData) {
            await axiosApi.post('/ordersPizza.json', objData);
        }
    }
);

export const fetchOrders = createAsyncThunk<IOrder[], undefined, { dispatch: AppDispatch , state: RootState}>(
    'cart/fetch',
    async (_, thunkAPI) => {
        const ordersResponse = await axiosApi.get('/ordersPizza.json');

        let newOrders: IOrder[] = [];
        const ordersData = ordersResponse.data;
        if(ordersData) {
            newOrders = Object.keys(ordersData).map((key) => {
                return {
                    ...ordersData[key],
                    id: key,
                }
            })
        }

        return newOrders;
    }
);

export const deleteOrder = createAsyncThunk<void, string>(
    'cart/delete',
    async (id) => {
        await axiosApi.delete('/ordersPizza/' + id + '.json');
    }
);