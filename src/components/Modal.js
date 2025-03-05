import React from 'react';

const Modal = () => {
  return (
    <div className="modal">
      <div className="modal__body">
        <div className="auth-form">
          <div className="auth-form__container">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">Đăng Ký</h3>
              <div className="auth-form__switch-btn">Đăng nhập</div>
            </div>
            <div className="auth-form__form">
              <div className="auth-form__group">
                <input type="text" placeholder="Số điện thoại" className="auth-form__input" />
              </div>
              <div className="auth-form__group">
                <input type="password" placeholder="Mật khẩu" className="auth-form__input" />
              </div>
              <div className="auth-form__group">
                <input type="password" placeholder="Nhập lại mật khẩu" className="auth-form__input" />
              </div>
            </div>
            <div className="auth-form__policy">
              <p className="auth-form__policy-text">
                Bằng việc đăng ký, bạn đồng ý với Shoppee về 
                <a href="#" className="auth-form__text-link">Điều khoản dịch vụ</a> & 
                <a href="#" className="auth-form__text-link">Chính sách bảo mật</a>
              </p>
            </div>
            <div className="auth-form__control">
              <button className="btn auth-form__back">TRỞ LẠI</button>
              <button className="btn btn--primary">ĐĂNG KÝ</button>
            </div>
          </div>
          <div className="auth-form__signin">
            <a href="#" className="btn btn-signin auth-form__signin-fb">
              <i className="auth-form__signin-icon fab fa-facebook-square"></i>
              <p className="auth-form__signin-text">Kết nối với Facebook</p>
            </a>
            <a href="#" className="btn btn-signin auth-form__signin-gg">
              <i className="auth-form__signin-icon fab fa-google"></i>
              <p className="auth-form__signin-text">Kết nối với Google</p>
            </a>
          </div>
        </div>
        {/* Thêm form đăng nhập tương tự */}
      </div>
    </div>
  );
};

export default Modal;