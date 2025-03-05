import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const initFormValue = {
  email: "",
  password: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};

const isEmailValid = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default function LoginAccount() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useCart();

  const validateForm = () => {
    const error = {};
    if (isEmptyValue(formValue.email)) {
      error["email"] = "Email is required";
    } else if (!isEmailValid(formValue.email)) {
      error["email"] = "Email is invalid";
    }
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password is required";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Login successful", formValue);
      login({
        email: formValue.email,
        password: formValue.password,
        firstName: 'User', // Giả lập tên, có thể lấy từ server
        lastName: '',
      });
      const from = location.state?.from || '/';
      navigate(from);
    } else {
      console.log("Form invalid");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1 className="title">Đăng nhập tài khoản Shoppe</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              className="form-control"
              type="text"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
            {formError.email && (
              <div className="error-feedback">{formError.email}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
            {formError.password && (
              <div className="error-feedback">{formError.password}</div>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Hoàn tất đăng nhập
          </button>
        </form>
        <div className="switch-page">
          <p>
            Bạn chưa có tài khoản Shoppe? <Link to="/register">Đăng ký tại đây</Link>
          </p>
        </div>
      </div>
    </div>
  );
}