import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { isLoggedIn, logout, userInfo, updateUserInfo } = useCart();
  const navigate = useNavigate();
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: '',
    confirmPassword: '',
    avatar: userInfo.avatar,
  });
  const [formError, setFormError] = useState({});

  const handleLogout = () => {
    logout();
    alert('Đã đăng xuất thành công!');
    navigate('/');
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setFormData({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: '',
      confirmPassword: '',
      avatar: userInfo.avatar,
    });
    setFormError({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result }); // Lưu dữ liệu ảnh dưới dạng base64
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const error = {};
    if (!formData.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      error.email = 'Email không hợp lệ';
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      error.confirmPassword = 'Mật khẩu không khớp';
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (validateForm()) {
      updateUserInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password || userInfo.password, // Giữ mật khẩu cũ nếu không đổi
        avatar: formData.avatar,
      });
      setEditMode(false);
      alert('Cập nhật thông tin thành công!');
    }
  };

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container">
      <div className="grid wide">
        <h2 className="account-heading">Thông tin tài khoản</h2>
        <div className="account-info">
          {!editMode ? (
            <>
              <div className="account-avatar">
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt="Avatar" className="avatar-img" />
                ) : (
                  <i className="fas fa-user-circle avatar-placeholder"></i>
                )}
              </div>
              <p><strong>Họ và tên:</strong> {userInfo.firstName} {userInfo.lastName}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <button className="btn btn--primary edit-btn" onClick={handleEditToggle}>
                Chỉnh sửa
              </button>
              <button className="btn btn--primary logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <form onSubmit={handleSave}>
              <div className="account-form-group">
                <label>Họ:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="account-form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="account-form-group">
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
              <div className="account-form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="account-form-group">
                <label>Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                />
                {formError.confirmPassword && (
                  <span className="error-feedback">{formError.confirmPassword}</span>
                )}
              </div>
              <div className="account-form-group">
                <label>Ảnh đại diện:</label>
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                {formData.avatar && (
                  <img src={formData.avatar} alt="Preview" className="avatar-preview" />
                )}
              </div>
              <button type="submit" className="btn btn--primary save-btn">
                Lưu thay đổi
              </button>
              <button type="button" className="btn cancel-btn" onClick={handleEditToggle}>
                Hủy
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;