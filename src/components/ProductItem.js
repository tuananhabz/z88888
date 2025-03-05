import React from 'react';
import { useCart } from '../context/CartContext';

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    console.log('Added to cart:', product.name); // Thêm log để kiểm tra
  };

  return (
    <div data={product.id} className="col l-2-4 m-3 c-6 home-product-item">
      <a className="home-product-item-link" href="#">
        <div className="home-product-item__img" style={{ backgroundImage: `url(/assets/img/home/${product.id}.PNG)` }}></div>
        <div className="home-product-item__info">
          <h4 className="home-product-item__name">{product.name}</h4>
          <div className="home-product-item__price">
            <p className="home-product-item__price-old">{product.oldPrice}đ</p>
            <p className="home-product-item__price-new">{product.newPrice}đ</p>
            <i className="home-product-item__ship fas fa-shipping-fast"></i>
          </div>
          <div className="home-product-item__footer">
            <div className="home-product-item__save">
              <input type="checkbox" id={`heart-save-${product.id}`} />
              <label htmlFor={`heart-save-${product.id}`} className="far fa-heart"></label>
            </div>
            <div className="home-product-item__rating-star">
              <i className="star-checked far fa-star"></i>
              <i className="star-checked far fa-star"></i>
              <i className="star-checked far fa-star"></i>
              <i className="star-checked far fa-star"></i>
              <i className="star-uncheck far fa-star"></i>
            </div>
            <div className="home-product-item__saled">Đã bán {product.saled}</div>
          </div>
          <div className="home-product-item__origin">{product.origin}</div>
          <div className="home-product-item__favourite">Yêu thích</div>
          <div className="home-product-item__sale-off">
            <div className="home-product-item__sale-off-value">{product.saleOff}%</div>
            <div className="home-product-item__sale-off-label">GIẢM</div>
          </div>
          <button className="btn home-product-item-add-to-cart" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
        </div>
        <div className="home-product-item-footer">Tìm sản phẩm tương tự</div>
      </a>
    </div>
  );
};

export default ProductItem;