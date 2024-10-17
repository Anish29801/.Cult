import React, { useState } from 'react';
import './css/SalesBanners.css';

const SuperSaverSaleBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="banner sale-banner-1">
            <button className="close-button" onClick={handleClose}>×</button>
            <h2>Super Saver Sale</h2>
            <p>Get up to 50% off on selected tests! Limited time offer.</p>
            <a href="http://localhost:8080/shop" className="shop-now-btn">
                Shop Now
            </a>
        </div>
    );
};

export default SuperSaverSaleBanner;
