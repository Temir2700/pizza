import {IPizza} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPizzas} from "./pizzaThunk";

interface PizzasState {
    items: IPizza[];
    fetchLoading: boolean;
}

const initialState: PizzasState = {
    items: [],
    fetchLoading: false,
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
    }
});

export const pizzasReducer = pizzasSlice.reducer;
export const {
    updatePizza
} = pizzasSlice.actions;
