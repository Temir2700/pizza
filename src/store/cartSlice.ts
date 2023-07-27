import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartPizza, IPizza} from "../types";



interface CartState {
    cart: ICartPizza[];
}

const initialState: CartState = {
    cart: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza: (state, { payload: pizza }: PayloadAction<IPizza>)=>{
            const existingIndex = state.cart.findIndex(cartPizza => cartPizza.pizza.id === pizza.id);

            if (existingIndex !== -1) {
                state.cart[existingIndex].amount++;
            } else {
                state.cart.push({
                    amount: 1,
                    pizza,
                });
            }
        },
        updateCart: (state, { payload: pizzas}: PayloadAction<IPizza[]>) => {
            const newCart: ICartPizza[] = [];

            state.cart.forEach((cartPizza) => {
                const existingPizza = pizzas.find((pizza) => cartPizza.pizza.id === pizza.id);

                if (!existingPizza) {
                    return;
                }

                newCart.push({
                    ...cartPizza,
                    pizza: existingPizza,
                });

                state.cart = newCart;
            });
        },
        clearCart: (state) => {
            state.cart = [];
        },
    }
});

export const cartReducer = cartSlice.reducer;
export const {
    addPizza,
    updateCart,
    clearCart,
} = cartSlice.actions;