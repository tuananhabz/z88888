import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const initFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const isEmptyValue = (value) => !value || value.trim().length < 1;

const isEmailValid = (email) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export default function RegisterAccount() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const error = {};
    if (isEmptyValue(formValue.firstName)) {
      error["firstName"] = "Tên là bắt buộc";
    }
    if (isEmptyValue(formValue.lastName)) {
      error["lastName"] = "Họ là bắt buộc";
    }
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email là bắt buộc";
    } else if (!isEmailValid(formValue.email)) {
      error["email"] = "Email không hợp lệ";
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Mật khẩu là bắt buộc";
    }
    if (isEmptyValue(formValue.confirmPassword)) {
      error["confirmPassword"] = "Xác nhận mật khẩu là bắt buộc";
    } else if (formValue.confirmPassword !== formValue.password) {
      error["confirmPassword"] = "Mật khẩu không khớp";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("form value", formValue);
      setSuccessMessage("Đăng ký thành công! Chuyển đến trang đăng nhập...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      console.log("form invalid");
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Đăng ký tài khoản Shoppe</h1>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="first-name" className="form-label">Tên</label>
            <input
              id="first-name"
              className="form-control"
              type="text"
              name="firstName"
              value={formValue.firstName}
              onChange={handleChange}
            />
            {formError.firstName && <div className="error-feedback">{formError.firstName}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="last-name" className="form-label">Họ</label>
            <input
              id="last-name"
              className="form-control"
              type="text"
              name="lastName"
              value={formValue.lastName}
              onChange={handleChange}
            />
            {formError.lastName && <div className="error-feedback">{formError.lastName}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
            {formError.email && <div className="error-feedback">{formError.email}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">Mật khẩu</label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
            {formError.password && <div className="error-feedback">{formError.password}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="confirm-password" className="form-label">Xác nhận mật khẩu</label>
            <input
              id="confirm-password"
              className="form-control"
              type="password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleChange}
            />
            {formError.confirmPassword && <div className="error-feedback">{formError.confirmPassword}</div>}
          </div>

          <button type="submit" className="submit-btn">Hoàn tất đăng ký</button>
        </form>

        <div className="switch-page">
          <p>Bạn đã có tài khoản Shoppe? <Link to="/login">Đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
}