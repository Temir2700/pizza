import {IPizza} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createPizza, fetchPizzas} from "./pizzaThunk";

interface PizzasState {
    items: IPizza[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: PizzasState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

const pizzasSlice = createSlice( {
    name: 'pizzas',
    initialState,
    reducers: {
        updatePizza: (state, { payload: pizzas}: PayloadAction<IPizza[]>) => {
            const newPizzas: IPizza[] = [];

            state.items.forEach((pizza) => {
                const existingPizza = pizzas.find((onePizza) => pizza.id === onePizza.id);

                if (!existingPizza) {
                    return;
                }

                newPizzas.push({
                    ...pizza,
                });

                state.items = newPizzas;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createPizza.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createPizza.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createPizza.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const pizzasReducer = pizzasSlice.reducer;
export const {
    updatePizza
} = pizzasSlice.actions;
