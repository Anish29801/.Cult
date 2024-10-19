import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Shop.css';
import BuyOneGetOneBanner from './BuyOneGetOneBanner';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]); // State to track cart items
  const [isCartOpen, setIsCartOpen] = useState(false); // State to toggle cart drawer
  const [popupMessage, setPopupMessage] = useState(null); // State for popup message
  const [popupType, setPopupType] = useState(''); // State for popup type ('success' or 'error')
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  }, [searchQuery, products]);

  // Handle quantity change for products
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Handle "Buy Now" action for individual products
  const handleBuyNow = async (product) => {
    const quantity = quantities[product._id] || 1;

    try {
      const response = await axios.post('http://localhost:4000/sell-product', {
        productId: product._id,
        quantity: quantity,
      });
      setPopupMessage(`Successfully purchased ${quantity} x ${product.name}!`);
      setPopupType('success');
    } catch (error) {
      setPopupMessage('Could not complete the purchase. Please try again.');
      setPopupType('error');
    }

    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const productToAdd = { ...product, quantity };

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, productToAdd];
      }
    });

    setPopupMessage(`${quantity} x ${product.name} added to your cart!`);
    setPopupType('success');

    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    setCart([]);
    setPopupMessage('Cart cleared!');
    setPopupType('success');

    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };

  // Handle "Buy Now" action for all cart items
  const handleBuyNowForCart = async () => {
    if (cart.length === 0) {
      setPopupMessage('Your cart is empty!');
      setPopupType('error');
      setTimeout(() => {
        setPopupMessage(null);
      }, 3000);
      return;
    }

    try {
      await axios.post('http://localhost:4000/sell-cart', {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
      });
      setPopupMessage('Purchase successful for all items in the cart!');
      setPopupType('success');
      setCart([]); // Clear the cart after successful purchase
    } catch (error) {
      setPopupMessage('Could not complete the purchase. Please try again.');
      setPopupType('error');
    }

    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };

  // Handle showing/hiding the cart drawer
  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle closing the cart drawer
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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
      <BuyOneGetOneBanner />
      {/* Header with Cart button and Search bar */}
      <div className="shop-header-container">
        <h2 className="shop-header">Our Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <button className="cart-btn" onClick={handleCartClick}>
          Cart ({cart.length})
        </button>
      </div>

      {/* Popup Notification */}
      {popupMessage && (
        <div className={`popup ${popupType}`}>
          {popupMessage}
        </div>
      )}

      {/* Overlay */}
      {isCartOpen && <div className="overlay show" onClick={handleCloseCart}></div>}

      {/* Cart Side Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={handleCloseCart}>
          X
        </button>
        <h3 className="cart-header">Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item._id} className="cart-item">
                  <span>{item.name}</span>
                  <span>{item.quantity} x Rs. {item.price}</span>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h4>Total: Rs. {calculateTotalPrice()}</h4>
            </div>
            {/* Buy Now Button for the cart */}
            <button className="buy-now-cart-btn" onClick={handleBuyNowForCart}>
              Buy Now
            </button>
            {/* Clear Cart Button */}
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </>
        )}
      </div>

      {/* Product List */}
      <div className="product-grid">
        {currentProducts.length === 0 ? (
          <p>No products available at the moment.</p>
        ) : (
          currentProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Price: Rs. {product.price}</p>
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

              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
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

export default Shop;
