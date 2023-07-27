import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartPizza, IPizza} from "../types";



interface CartState {
    cart: ICartPizza[];
    show: boolean;
}

const initialState: CartState = {
    cart: [],
    show: false,
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
        setShow: (state, {payload: boolean}) => {
            state.show = boolean;
        },
        onDelete: (state, {payload: string}) => {
            state.cart.splice(string, 1);
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const {
    addPizza,
    updateCart,
    clearCart,
    setShow,
    onDelete
} = cartSlice.actions;