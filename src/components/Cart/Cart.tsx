import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import ClientModal from "../../containers/ClientModal/ClientModal";
import {setShow} from "../../store/cartSlice";

const Cart = () => {
    const cartDishes = useAppSelector((state) => state.cart.cart);
    const showState = useAppSelector((state) => state.cart.show);
    const dispatch = useAppDispatch()

    const sum = cartDishes.reduce((acc, value) => {
        return acc + value.amount * value.pizza.price;
    }, 0);

    let modal: React.ReactNode = null;

    if(showState) {
        modal = <ClientModal/>;
    }
    return (
        <>
            <div className="cart">
                <div>Total: <strong>{sum}</strong> KGS</div>
                <div>
                    <button className="btn btn-checkout" onClick={() => dispatch(setShow(true))}>Checkout</button>
                </div>
            </div>
            {modal}
        </>

    );
};

export default Cart;