import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {IApiPizza, IPizza, IPizzaMutation, TApiPizza} from "../types";
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

export const createPizza = createAsyncThunk<void, TApiPizza>(
    'pizzas/create',
    async (pizza) => {
        await axiosApi.post('/pizzas.json', pizza);
    }
);

export const fetchPizza = createAsyncThunk<IPizzaMutation, string>(
    'pizzas/fetchOne',
    async (id) => {

        const response = await axiosApi.get<IPizzaMutation | null>('/pizzas/' + id + '.json');
        const pizza = response.data;

        if (pizza === null) {
            throw new Error('Not found');
        }

        return pizza;
    }
);

interface UpdatePizzaParams {
    id: string;
    pizza: TApiPizza;
}
export const fetchUpdatePizza = createAsyncThunk<void, UpdatePizzaParams>(
    'pizzas/updatePizza',
    async (params) => {
        await axiosApi.put(`/pizzas/${params.id}.json`, params.pizza);
    }
);

export const deletePizza = createAsyncThunk<void, string>(
    'pizzas/delete',
    async (id) => {
        await axiosApi.delete('/pizzas/' + id + '.json');
    }
);