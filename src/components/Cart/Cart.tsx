import React from 'react';
import {useAppSelector} from "../../app/hook";

const Cart = () => {
    const cartDishes = useAppSelector((state) => state.cart.cart);
    const sum = cartDishes.reduce((acc, value) => {
        return acc + value.amount * value.pizza.price;
    }, 0);

    return (
        <div className="cart">
            <div>Total: <strong>{sum}</strong> KGS</div>
            <div>
                <button className="btn btn-checkout">Checkout</button>
            </div>
        </div>
    );
};

export default Cart;