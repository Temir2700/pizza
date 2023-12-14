import React from 'react';
import logo from "../../assets/images/Logo.png";
import { useNavigate} from "react-router-dom";

const MainHeader = () => {
    const navigate = useNavigate();
    const onLogoClick = () => {
        navigate('/');
    };
    
    return (
        <header className="header">
            <div className="container">
                <div className="logo" onClick={onLogoClick}>
                    <img src={logo} alt="Logo"/>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
