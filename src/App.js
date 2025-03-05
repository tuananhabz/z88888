import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Cart from './components/Cart';
import LoginAccount from './components/LoginAccount';
import RegisterAccount from './components/RegisterAccount';
import Checkout from './components/Checkout';
import Account from './components/Account';
import Support from './components/Support'; // Import Support

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/register" element={<RegisterAccount />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/support" element={<Support />} /> {/* Tuyến đường cho trang hỗ trợ */}
        </Routes>
        <Footer />
        <Modal />
      </div>
    </Router>
  );
}

export default App;