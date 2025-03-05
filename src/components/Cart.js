import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.newPrice.replace('đ', '').replace('.', ''));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    console.log('Navigating to checkout...'); // Thêm log để kiểm tra
    navigate('/checkout'); // Chuyển hướng đến trang thanh toán
  };

  return (
    <div className="container">
      <div className="grid wide">
        <h2 className="cart-heading">Giỏ hàng của bạn</h2>
        {cart.length === 0 ? (
          <p className="cart-empty">Giỏ hàng của bạn trống.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={`/assets/img/home/${item.id}.PNG`} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">{item.newPrice}</p>
                    <div className="cart-item-quantity">
                      <button
                        className="cart-item-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="cart-item-quantity-value">{item.quantity}</span>
                      <button
                        className="cart-item-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <p>Tổng cộng: <strong>{total.toLocaleString()}đ</strong></p>
              <button className="btn btn--primary cart-checkout" onClick={handleCheckout}>
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;