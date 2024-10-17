import React, { useState } from 'react';
import './css/SalesBanners.css';

const BuyOneGetOneBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="banner sale-banner-2">
            <button className="close-button" onClick={handleClose}>×</button>
            <h2>Buy 1 Get 1 Free</h2>
            <p>Exclusive deal on health checkup packages! Don't miss out.</p>
        </div>
    );
};

export default BuyOneGetOneBanner;
