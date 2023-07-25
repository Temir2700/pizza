import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IApiPizza, IPizza} from "../types";
import {AppDispatch} from "../app/store";
import {updatePizza} from "./pizzaSlice";

export const fetchPizzas = createAsyncThunk<IPizza[], undefined, { dispatch: AppDispatch }>(
    'pizzas/fetch',
    async (_, thunkAPI) => {
        const pizzasResponse = await axiosApi.get<IApiPizza | null>('/pizzas.json');
        const pizzasData = pizzasResponse.data;
        let newPizzas: IPizza[] = [];

        if(pizzasData) {
            newPizzas = Object.keys(pizzasData).map((key) => {
                return {
                    ...pizzasData[key],
                    id: key
                };
            });
        }

        thunkAPI.dispatch(updatePizza(newPizzas));
        return newPizzas;
    }
);