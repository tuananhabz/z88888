import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isQrVisible, setIsQrVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const navigate = useNavigate();
  const { cart, removeFromCart, getCartCount, searchQuery, setSearchQuery, isLoggedIn } = useCart();

  const handleQrToggle = () => {
    setIsQrVisible(!isQrVisible);
  };

  const handleGoHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="grid wide">
        <nav className="header__navbar hide-on-mobile-tablet">
          <ul className="header__nav-list">
            <li className="header__nav-item header__nav-item--hover header__nav-item--separate">Kênh Người Bán</li>
            <li className="header__nav-item header__nav-item--hover header__nav-item--separate">Trở thành Người bán Shopee</li>
            <li
              className="header__nav-item header__nav-item--hover header__nav-item--separate header__show-qr"
              onClick={handleQrToggle}
            >
              Tải ứng dụng
              {isQrVisible && (
                <div className="header__qrcode" style={{ display: 'block' }}>
                  <img src="/assets/img/qr/qr-code.png" className="header__qr" alt="QR Code" />
                  <div className="header__apps">
                    <a href="#" className="header__app-link">
                      <img src="/assets/img/qr/app-store.png" className="header__app-img" alt="App Store" />
                    </a>
                    <a href="#" className="header__app-link">
                      <img src="/assets/img/qr/gg-play.png" className="header__app-img" alt="Google Play" />
                    </a>
                    <a href="#" className="header__app-link">
                      <img src="/assets/img/qr/app-gallery.png" className="header__app-img" alt="App Gallery" />
                    </a>
                    <a href="#" className="header__app-link">
                      <img src="/assets/img/qr/ltp-img.png" className="header__app-img" alt="LTP" />
                    </a>
                  </div>
                </div>
              )}
            </li>
            <li className="header__nav-item">
              Kết nối
              <a href="https://www.facebook.com/" className="header__nav-icon-link">
                <i className="header__nav-icon fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/" className="header__nav-icon-link">
                <i className="header__nav-icon fab fa-instagram"></i>
              </a>
            </li>
          </ul>
          <ul className="header__nav-list">
            <li className="header__nav-item header__show-note">
              <a href="#" className="header__nav-item-link">
                <i className="header__nav-icon far fa-bell"></i> Thông báo
              </a>
              <div className="header__notifi">
                <header className="header__notifi-header">
                  <h3>Thông Báo Mới Nhận</h3>
                </header>
                <ul className="header__notifi-list">
                  <li className="header__notifi-item">
                    <a href="#" className="header__notifi-link">
                      <img src="/assets/img/sp/casio.png" className="header__notifi-img" alt="Casio" />
                      <div className="header__notifi-info">
                        <div className="header__notifi-name">Casio fx 580 VN Plus</div>
                        <div className="header__notifi-desc">Mua Casio 580 của LTP bao xịn, bao mượt, bao đẹp</div>
                      </div>
                    </a>
                  </li>
                </ul>
                <footer className="header__notifi-footer">
                  <a href="#" className="header__notifi-footer-btn">Xem tất cả</a>
                </footer>
              </div>
            </li>
            <li className="header__nav-item">
              <Link to="/support" className="header__nav-item-link">
                <i className="header__nav-icon far fa-question-circle"></i> Hỗ trợ
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="header__nav-item header__nav-item--bold">
                <Link to="/account" className="header__nav-item-link">Tài khoản</Link>
              </li>
            ) : (
              <>
                <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
                  <Link to="/register" className="header__nav-item-link">Đăng ký</Link>
                </li>
                <li className="header__nav-item header__nav-item--bold">
                  <Link to="/login" className="header__nav-item-link">Đăng nhập</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="header__contain">
          <label htmlFor="mobile-search" className="header__mobile-search">
            <i className="header__mobile-search-icon fas fa-search"></i>
          </label>
          <div className="header__logo">
            <a href="#" className="header__logo-link" onClick={handleGoHome}>
              <img src="/assets/img/logo/logo-full-white.png" className="header__logo-img" alt="Shopee Logo" />
            </a>
          </div>
          <input type="checkbox" id="mobile-search" className="header__search-check" hidden />
          <div className="header__search">
            <div className="header__search-input-wrap">
              <input
                type="text"
                className="header__search-input"
                placeholder="Tìm kiếm trên Shoppee"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              
            </div>
            <button className="btn header__search-btn">
              <i className="header__search-btn-icon fas fa-search"></i>
            </button>
          </div>
          <div className="header__cart header__cart--has-cart" onClick={handleCartToggle}>
            <i className="header__cart-icon fas fa-shopping-cart"></i>
            <div className="header__cart-count">{getCartCount() || 0}</div>
            {isCartVisible && (
              <div className="header__cart-list has-cart">
                <h4 className="header__cart-heading">Sản phẩm đã chọn</h4>
                <ul className="header__cart-list-item">
                  {cart.map((item) => (
                    <li key={item.id} className="header__cart-item">
                      <img src={`/assets/img/home/${item.id}.PNG`} className="header__cart-item-img" alt={item.name} />
                      <div className="header__cart-item-info">
                        <div className="header__cart-item-heading">
                          <h3 className="header__cart-item-name">{item.name}</h3>
                          <p className="header__cart-item-price">{item.newPrice}</p>
                        </div>
                        <div className="header__cart-item-body">
                          <p className="header__cart-item-number">x {item.quantity}</p>
                          <button
                            className="header__cart-item-close"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromCart(item.id);
                            }}
                          >
                            Xóa <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="header__cart-footer">
                  <a href="#" className="btn btn--primary header__cart-see-cart" onClick={handleViewCart}>
                    Xem giỏ hàng
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="header__sort-bar">
          <li className="header__sort-item">
            <a href="#" className="header__sort-link">Liên quan</a>
          </li>
          <li className="header__sort-item header__sort-item--active">
            <a href="#" className="header__sort-link">Mới nhất</a>
          </li>
          <li className="header__sort-item">
            <a href="#" className="header__sort-link">Bán chạy</a>
          </li>
          <li className="header__sort-item">
            <a href="#" className="header__sort-link">Giá</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;