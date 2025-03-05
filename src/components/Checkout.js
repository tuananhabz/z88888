import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, isLoggedIn } = useCart();
  const navigate = useNavigate();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Trạng thái hiển thị tùy chọn thanh toán

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.newPrice.replace('đ', '').replace('.', ''));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để tiếp tục thanh toán.');
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      setShowPaymentOptions(true); // Hiển thị tùy chọn thanh toán ngay lập tức khi nhấp
    }
  };

  const handlePaymentOption = (option) => {
    if (option === 'cod') {
      alert('Bạn đã chọn thanh toán khi nhận hàng. Đơn hàng sẽ được xử lý.');
      // Thêm logic xử lý thanh toán COD ở đây nếu cần
    } else if (option === 'now') {
      alert('Bạn đã chọn thanh toán ngay bây giờ. Chuyển đến cổng thanh toán...');
      // Thêm logic chuyển hướng đến cổng thanh toán ở đây nếu cần
    }
    setShowPaymentOptions(false); // Ẩn tùy chọn sau khi chọn
  };

  return (
    <div className="container">
      <div className="grid wide">
        <h2 className="checkout-heading">Thanh toán</h2>
        {cart.length === 0 ? (
          <p className="checkout-empty">Giỏ hàng của bạn trống.</p>
        ) : (
          <>
            <ul className="checkout-list">
              {cart.map((item) => (
                <li key={item.id} className="checkout-item">
                  <img src={`/assets/img/home/${item.id}.PNG`} alt={item.name} className="checkout-item-img" />
                  <div className="checkout-item-info">
                    <h3 className="checkout-item-name">{item.name}</h3>
                    <p className="checkout-item-price">{item.newPrice}</p>
                    <div className="checkout-item-quantity">
                      <button
                        className="checkout-item-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="checkout-item-quantity-value">{item.quantity}</span>
                      <button
                        className="checkout-item-quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="checkout-item-remove" onClick={() => removeFromCart(item.id)}>
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <p>Tổng cộng: <strong>{total.toLocaleString()}đ</strong></p>
              <button className="btn btn--primary checkout-btn" onClick={handleCheckoutClick}>
                Thanh toán
              </button>
            </div>

            {/* Hiển thị tùy chọn thanh toán khi nhấp */}
            {showPaymentOptions && (
              <div className="payment-options">
                <button
                  className="btn btn--primary payment-option-btn"
                  onClick={() => handlePaymentOption('cod')}
                >
                  Thanh toán khi nhận hàng
                </button>
                <button
                  className="btn btn--primary payment-option-btn"
                  onClick={() => handlePaymentOption('now')}
                >
                  Thanh toán ngay bây giờ
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;