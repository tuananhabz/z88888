import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const { isLoggedIn, userInfo } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: `${userInfo.firstName} ${userInfo.lastName}`.trim() || '',
    phone: '',
    email: userInfo.email || '',
    message: '',
  });
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  if (!isLoggedIn) {
    navigate('/login'); // Chuyển hướng nếu chưa đăng nhập
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const error = {};
    if (!formData.fullName) error.fullName = 'Tên khách hàng là bắt buộc';
    if (!formData.phone || !/^\d{10,11}$/.test(formData.phone)) error.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    if (!formData.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      error.email = 'Email không hợp lệ';
    }
    if (!formData.message) error.message = 'Nội dung hỗ trợ là bắt buộc';
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Phiếu hỗ trợ:', formData); // Có thể gửi dữ liệu này đến server
      setSuccessMessage('Gửi phiếu hỗ trợ thành công!');
      setFormData({
        fullName: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
        phone: '',
        email: userInfo.email,
        message: '',
      });
      setTimeout(() => setSuccessMessage(''), 3000); // Ẩn thông báo sau 3 giây
    }
  };

  return (
    <div className="container">
      <div className="grid wide">
        <h2 className="support-heading">Hỗ trợ khách hàng</h2>
        <div className="support-form">
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="support-form-group">
              <label>Tên khách hàng:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
              />
              {formError.fullName && <span className="error-feedback">{formError.fullName}</span>}
            </div>
            <div className="support-form-group">
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
              {formError.phone && <span className="error-feedback">{formError.phone}</span>}
            </div>
            <div className="support-form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
              {formError.email && <span className="error-feedback">{formError.email}</span>}
            </div>
            <div className="support-form-group">
              <label>Nội dung cần hỗ trợ:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                rows="5"
              />
              {formError.message && <span className="error-feedback">{formError.message}</span>}
            </div>
            <button type="submit" className="btn btn--primary submit-btn">
              Gửi phiếu hỗ trợ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;