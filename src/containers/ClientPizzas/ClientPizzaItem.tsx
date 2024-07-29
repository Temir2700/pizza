import React from "react";
import { IPizza } from "../../types";
import { useAppDispatch } from "../../app/hook";
import { addPizza } from "../../store/cartSlice";

interface Props {
  pizza: IPizza;
}
const ClientPizzaItem: React.FC<Props> = ({ pizza }) => {
  const dispatch = useAppDispatch();
  const addPizzas = () => {
    dispatch(addPizza(pizza));
  };

  return (
    <div className="pizza-item pizza-item-client" onClick={addPizzas}>
      <div className="pizza-item-left">
        <img alt={pizza.id} src={pizza.image} className="pizza-img" />
      </div>
      <div className="pizza-item-right pizza-item-right-clients">
        <div className="pizza-price  pizza-price-clients">
          {pizza.price} KGS
        </div>
        <div>
          <span className="pizza-title pizza-title-clients">{pizza.title}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientPizzaItem;
