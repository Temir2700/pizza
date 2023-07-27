import {IPizza, IPizzaMutation} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createPizza, deletePizza, fetchPizza, fetchPizzas, fetchUpdatePizza} from "./pizzaThunk";

interface PizzasState {
    items: IPizza[];
    onePizza: IPizzaMutation | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchOneLoading: boolean;
    updateLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: PizzasState = {
    items: [],
    onePizza: null,
    fetchLoading: false,
    createLoading: false,
    fetchOneLoading: false,
    updateLoading: false,
    deleteLoading: false,
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
        updateOnePizza: (state) => {
            state.onePizza = null;
        }
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
        builder.addCase(fetchPizza.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchPizza.fulfilled, (state, {payload: pizza}) => {
            state.onePizza = pizza;
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchUpdatePizza.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(fetchUpdatePizza.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(fetchUpdatePizza.rejected, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(deletePizza.pending, (state, {meta}) => {
            state.deleteLoading = meta.arg;
        });
        builder.addCase(deletePizza.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deletePizza.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const pizzasReducer = pizzasSlice.reducer;
export const {
    updatePizza,
    updateOnePizza
} = pizzasSlice.actions;
