import React from 'react';
import logo from "../../assets/images/Logo.png";

const MainHeader = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;