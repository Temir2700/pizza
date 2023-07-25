import React from 'react';
import {IPizza} from "../../types";

interface Props {
    pizza: IPizza;
}
const PizzaItem: React.FC<Props> = ({pizza}) => {
    return (
        <div className="pizza-item">
            <div className="pizza-item-left">
                <img
                    alt={pizza.id}
                    src={pizza.image}
                    className="pizza-img"
                />
                <span className="pizza-title">{pizza.title}</span>
            </div>
            <div className="pizza-item-right">
                <span className="pizza-price">{pizza.price} KGS</span>
                <div>
                    <button className="btn btn-edit">Edit</button>
                    <button className="btn btn-delete">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;