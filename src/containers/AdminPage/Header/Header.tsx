import React from 'react';
import logo from "../../../assets/images/Logo.png";
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div className="header-btns">
                    <NavLink to="dishes" className="btn btn-pizza">Pizzas</NavLink>
                    <NavLink to="orders" className="btn btn-order">Orders</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;