import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartPizza, IOrder, IPizza} from "../types";
import {createOrder, fetchOrders} from "./cartThunk";
import {deletePizza} from "./pizzaThunk";



interface CartState {
    cart: ICartPizza[];
    allOrders: IOrder[];
    fetchLoading: boolean;
    show: boolean;
    createLoading: boolean;
    newObj: IOrder ;
    deleteLoading: boolean,
}

const initialState: CartState = {
    cart: [],
    allOrders: [],
    fetchLoading: false,
    show: false,
    createLoading: false,
    newObj: {},
    deleteLoading: false,
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
        updateCart: (state, { payload: orders}: PayloadAction<IOrder[]>) => {
            const newCart: IOrder[] = [];

            state.allOrders.forEach((cartPizza) => {
                const existingPizza = orders.find((pizza) => cartPizza.id === pizza.id);

                if (!existingPizza) {
                    return;
                }

                newCart.push({
                    ...cartPizza,
                });

                state.allOrders = newCart;
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
        },
        assignObject: (state, action) => {
            Object.assign(state.newObj, action.payload)
        },
        clearObject: (state) => {
            state.newObj = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.allOrders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createOrder.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createOrder.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createOrder.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(deletePizza.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deletePizza.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deletePizza.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const cartReducer = cartSlice.reducer;
export const {
    addPizza,
    clearCart,
    setShow,
    onDelete,
    assignObject,
    clearObject
} = cartSlice.actions;