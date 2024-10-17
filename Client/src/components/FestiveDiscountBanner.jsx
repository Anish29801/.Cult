import React from 'react';
import './css/SalesBanners.css';

const FestiveDiscountBanner = () => {
    return (
        <div className="banner sale-banner-3">
            <h2>Festive Discount</h2>
            <p>Flat 30% off on all lab tests this festive season!</p>
            <button className="shop-now-btn"><a href="http://localhost:8080/lab" className="shop-now-btn">
                Explore Tests
            </a>
            </button>
        </div>
    );
};

export default FestiveDiscountBanner;
