import React, { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../app/hook";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { deletePizza, fetchPizzas } from "../../store/pizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import PizzaItem from "./PizzaItem";
import { IPizza } from "../../types";
import { NavLink } from "react-router-dom";
import { updateOnePizza } from "../../store/pizzaSlice";

const Pizza = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.pizzas.items);
  const pizzasLoading = useSelector(
    (state: RootState) => state.pizzas.fetchLoading
  );
  const pizza = useSelector((state: RootState) => state.pizzas.onePizza);
  const deleteLoading = useSelector(
    (state: RootState) => state.pizzas.deleteLoading
  );

  const removePizza = async (id: string) => {
    if (window.confirm("Do you want to delete pizza?")) {
      await dispatch(deletePizza(id));
      await dispatch(fetchPizzas());
    }
  };

  const checkOnePizza = useCallback(async () => {
    dispatch(updateOnePizza());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPizzas());
    if (pizza !== null) {
      void checkOnePizza();
    }
  }, [dispatch, checkOnePizza, pizza]);

  let pizzas: React.ReactNode = <Spinner />;

  if (!pizzasLoading) {
    pizzas = items.map((item: IPizza) => (
      <PizzaItem
        key={item.id}
        pizza={item}
        onDelete={() => removePizza(item.id)}
        deleteLoading={deleteLoading}
      />
    ));
  }

  return (
    <>
      <div className="pizza-admin">
        <h2 className="common-title">Pizzas</h2>
        <NavLink to={"/admin/new-pizza"} className="btn btn-add">
          Add new Pizza
        </NavLink>
      </div>
      {pizzas}
    </>
  );
};

export default Pizza;
