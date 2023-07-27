import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hook";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {fetchPizzas} from "../../store/pizzaThunk";
import Spinner from "../../components/Spinner/Spinner";
import PizzaItem from "./PizzaItem";
import {IPizza} from "../../types";
import {NavLink} from "react-router-dom";

const Pizza = () => {
    const dispatch = useAppDispatch();
    const items = useSelector((state: RootState) => state.pizzas.items);
    const pizzasLoading = useSelector((state: RootState) => state.pizzas.fetchLoading);


    let pizzas: React.ReactNode = <Spinner/>

    if(!pizzasLoading) {
        pizzas = items.map((item: IPizza) => (
            <PizzaItem
                key={item.id}
                pizza={item}
            />
        ))
    }
    useEffect(() => {
        dispatch(fetchPizzas());
    }, [dispatch]);

    return (
        <>
            <div className="pizza-admin">
                <h2 className="common-title">Pizzas</h2>
                <NavLink  to={'/admin/new-pizza'} className="btn btn-add">Add new Pizza</NavLink>
            </div>
            {pizzas}
        </>
    );
};

export default Pizza;