import React from "react";
import AdminForm from "../../components/AdminForm/AdminForm";
import { useAppDispatch } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { TApiPizza } from "../../types";
import { createPizza } from "../../store/pizzaThunk";
import MainHeader from "../../components/MainHeader/MainHeader";

const PizzaAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useSelector(
    (state: RootState) => state.pizzas.createLoading
  );

  const onSubmit = async (pizza: TApiPizza) => {
    await dispatch(createPizza(pizza));
    navigate("/admin/dishes");
  };
  return (
    <>
      <MainHeader />
      <div className="admin-page">
        <div className="container">
          <h1 className="admin-page-title">Add new Pizza!</h1>
        </div>
        <AdminForm onSubmit={onSubmit} isLoading={createLoading} />
      </div>
    </>
  );
};

export default PizzaAdd;
