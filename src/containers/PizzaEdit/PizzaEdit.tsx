import React, {useEffect} from 'react';
import {useAppDispatch} from "../../app/hook";
import {useNavigate, useParams} from "react-router-dom";
import AdminForm from "../../components/AdminForm/AdminForm";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {fetchPizza, fetchUpdatePizza} from "../../store/pizzaThunk";
import {TApiPizza} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import MainHeader from "../../components/MainHeader/MainHeader";

const PizzaEdit = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as {id: string}
    const navigate = useNavigate();
    const fetchLoading = useSelector((state: RootState) => state.pizzas.fetchOneLoading);
    const updateLoading = useSelector((state: RootState) => state.pizzas.updateLoading);
    const pizza = useSelector((state: RootState) => state.pizzas.onePizza);

    useEffect(() => {
        dispatch(fetchPizza(id));
    }, [dispatch, id]);

    const onSubmit = async (pizza: TApiPizza) => {
        await dispatch(fetchUpdatePizza({id, pizza}));
        navigate('/admin/dishes');
    };

    return (
        <>
            <MainHeader/>
            <div className="admin-page">
                <div className="container">
                    <h1 className="admin-page-title">Edit Pizza!</h1>
                </div>
                {fetchLoading && <Spinner/>}
                {pizza &&
                    <AdminForm
                    onSubmit={onSubmit}
                    isLoading={updateLoading}
                    isEdit={true}
                    existingPizza={pizza}
                    />
                }
            </div>
        </>
    );
};

export default PizzaEdit;