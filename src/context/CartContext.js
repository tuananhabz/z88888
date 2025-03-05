import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avatar: null, // Lưu URL hoặc dữ liệu ảnh
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setUserInfo({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || null,
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo({ firstName: '', lastName: '', email: '', password: '', avatar: null });
  };

  const updateUserInfo = (newInfo) => {
    setUserInfo((prev) => ({ ...prev, ...newInfo }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        searchQuery,
        setSearchQuery,
        isLoggedIn,
        login,
        logout,
        userInfo,
        updateUserInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);