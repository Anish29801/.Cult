import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Shop.css';
import FestiveDiscountBanner from './FestiveDiscountBanner';

const Lab = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [cart, setCart] = useState([]); // State to track cart items
    const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle cart drawer
    const [popupMessage, setPopupMessage] = useState(null); // State for popup message
    const [popupType, setPopupType] = useState(''); // State for popup type ('success' or 'error')
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const productsPerPage = 8;

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/labs');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Handle quantity change for products
    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    // Handle search input change
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="shop-container">
            <FestiveDiscountBanner />
            {/* Header with Cart button */}
            <div className="shop-header-container">
                <h2 className="shop-header">Our Tests</h2>
                <input
                    type="text"
                    placeholder="Search Tests..."
                    className="search-bar"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* Popup Notification */}
            {popupMessage && (
                <div className={`popup ${popupType}`}>
                    {popupMessage}
                </div>
            )}

            {/* Product List */}
            <div className="product-grid">
                {currentProducts.length === 0 ? (
                    <p>No products available at the moment.</p>
                ) : (
                    currentProducts.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3>{product.testName}</h3>
                            <p style={{ textDecoration: 'line-through', color: '#888', fontSize: '14px' }}>
                                Original Price: Rs. {product.originalPrice}
                            </p>
                            <p>Sale Price: Rs. {product.salePrice}</p>
                            <div className="quantity-input">
                                <input
                                    type="number"
                                    id={`quantity-${product._id}`}
                                    min="1"
                                    max={product.quantity}
                                    value={quantities[product._id] || 1}
                                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                />
                            </div>

                            <button
                                className="buy-now-btn"
                                onClick={() => handleBuyNow(product)}
                            >
                                Buy Now
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination controls */}
            <div className="pagination">
                <button
                    className="prev-btn"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="next-btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Lab;
