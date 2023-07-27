import React from 'react';
import MainHeader from "../../components/MainHeader/MainHeader";
import ClientPizzas from "../ClientPizzas/ClientPizzas";
import Cart from "../../components/Cart/Cart";

const ClientPage = () => {
    return (
        <>
         <MainHeader/>
            <div className="client-page">
                <div className="container">
                    <h1 className="client-page-title">Order!</h1>
                    <div className="container-inner">
                        <ClientPizzas/>
                        <Cart/>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ClientPage;