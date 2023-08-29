import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {assignObject, clearCart, onDelete, setShow} from "../../store/cartSlice";
import {createOrder} from "../../store/cartThunk";


const ClientModal = () => {
    const cartPizzas = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();

    const sum = cartPizzas.reduce((acc, value) => {
        return acc + value.amount * value.pizza.price;
    }, 0);

    const onItemDelete = (id: string) => {
        const index = cartPizzas.findIndex(item => {
            return item.pizza.id === id;
        });

        if (index !== -1) {
            dispatch(onDelete(index));
        }
    };

    const onOrderClick = () => {
        dispatch(setShow(false));


        if(cartPizzas.length !== 0) {
            cartPizzas.forEach((pizza) => {
                const amount = pizza.amount
                const id = pizza.pizza.id;

                const order = {
                    [id]: amount,
                }
                dispatch(assignObject(order));
            });

            dispatch(createOrder());
            dispatch(clearCart());
        } else {
            alert('Fill the order!');
        }
    };

    return (
        <div className="backdrop">
            <div className="modal">
                <h2 className="modal-title">Your order:</h2>
                <div>
                    {cartPizzas.map(oneCartPizza => {
                        return (
                            <div key={oneCartPizza.pizza.id} className="oneCartPizza">
                                <div>
                                    <img alt={oneCartPizza.pizza.id} src={oneCartPizza.pizza.image} className="oneCartPizza-img"/>
                                </div>
                                <div>{oneCartPizza.pizza.title}  x  {oneCartPizza.amount}</div>
                                <div>{oneCartPizza.pizza.price} KGS</div>
                                <button type="button" className="modal-btn-remove" onClick={() => onItemDelete(oneCartPizza.pizza.id)}></button>
                            </div>
                        )
                    })}
                </div>
                <div>Delivery <strong>150</strong> KGS</div>
                {cartPizzas.length > 0 ? <div>Total: <strong>{sum + 150} KGS</strong></div> : <div>Total: <strong>{sum} KGS</strong></div>}
                <div className="modal-btns">
                    <button
                        className="btn"
                        onClick={() => dispatch(setShow(false))}
                    >
                        Cancel
                    </button>
                    <button className="btn" onClick={onOrderClick}>Order</button>
                </div>
            </div>
        </div>
    );
};

export default ClientModal;