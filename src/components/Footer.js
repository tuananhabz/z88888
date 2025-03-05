import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="main-footer">
        <div className="grid wide">
          <div className="row sm-gutter main-footer-info">
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-item-link">Trung Tâm Trợ Giúp</a></li>
                {/* Thêm các mục khác */}
              </ul>
            </div>
            {/* Thêm các cột khác tương tự HTML */}
          </div>
          <div className="row">
            <div className="grid">
              <p className="copyright-title">
                © 2021 Shopee copyright - Công ty TNHH CRF - Product by LTP
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="other-footer">
        <div className="grid wide">
          <div className="row other-footer-heading">
            <div className="col l-2"><a href="#" className="other-footer-link">CHÍNH SÁCH BẢO MẬT</a></div>
            {/* Thêm các liên kết khác */}
          </div>
          <div className="row">
            <div className="grid other-footer-info">
              <p className="other-footer-title">Thông tin về Shoppee</p>
              <p className="other-footer-more">
                Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
                Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam.
                Tổng đài hỗ trợ: 19001221 - Email: support@shopee.vn
              </p>
              {/* Thêm thông tin khác */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;