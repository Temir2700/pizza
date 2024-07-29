import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hook";
import { fetchPizzas } from "../../store/pizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IPizza } from "../../types";
import ClientPizzaItem from "./ClientPizzaItem";

const ClientPizzas = () => {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.pizzas.items);
  const pizzasLoading = useSelector(
    (state: RootState) => state.pizzas.fetchLoading
  );

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]);

  let pizzas: React.ReactNode = <Spinner />;

  if (!pizzasLoading) {
    pizzas = items.map((item: IPizza) => (
      <ClientPizzaItem key={item.id} pizza={item} />
    ));
  }
  return <div>{pizzas}</div>;
};

export default ClientPizzas;
