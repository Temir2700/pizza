import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {onDelete, setShow} from "../../store/cartSlice";


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
                <div>Total: <strong>{sum} KGS</strong></div>
                <div className="modal-btns">
                    <button
                        className="btn"
                        onClick={() => dispatch(setShow(false))}
                    >
                        Cancel
                    </button>
                    <button className="btn">Order</button>
                </div>
            </div>
        </div>
    );
};

export default ClientModal;