import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { useCart } from '../context/CartContext';

const Container = () => {
  const { searchQuery } = useCart(); // Lấy searchQuery từ context
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/assets/db/shopee.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched:', data);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const parseSaledToNumber = (saled) => {
    if (typeof saled === 'string') {
      const num = parseFloat(saled.replace('k', '').replace(',', '.'));
      return isNaN(num) ? 0 : num * (saled.includes('k') ? 1000 : 1);
    }
    return saled || 0;
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Lọc theo searchQuery
    )
    .filter((product) => (selectedOrigin ? product.origin === selectedOrigin : true));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const saledA = parseSaledToNumber(a.saled);
    const saledB = parseSaledToNumber(b.saled);
    if (sortOrder === 'asc') return saledA - saledB;
    if (sortOrder === 'desc') return saledB - saledA;
    return 0;
  });

  const handlePageChange = (page) => {
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const shuffleProducts = () => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setProducts(shuffled);
    setSelectedOrigin('');
    setSortOrder('');
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.min(totalPages, 3); i++) {
    pageNumbers.push(i);
  }
  if (totalPages > 3) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  const uniqueOrigins = [...new Set(products.map((product) => product.origin))];

  return (
    <div className="container">
      <div className="grid wide">
        <div className="row sm-gutter">
          <div className="col l-2 m-0 c-0">
            <nav className="category">
              <h3 className="category-heading">
                <i className="category-heading-icon fas fa-list-ul"></i> Bộ lọc tìm kiếm
              </h3>
              <div className="category-group">
                <div className="category-group-title">Theo Nơi Bán</div>
                <ul className="category-group-list">
                  <li className="category-group-item">
                    <input
                      type="radio"
                      className="category-group-item-check"
                      name="origin"
                      value=""
                      checked={selectedOrigin === ''}
                      onChange={(e) => setSelectedOrigin(e.target.value)}
                    />
                    Tất cả
                  </li>
                  {uniqueOrigins.map((origin) => (
                    <li className="category-group-item" key={origin}>
                      <input
                        type="radio"
                        className="category-group-item-check"
                        name="origin"
                        value={origin}
                        checked={selectedOrigin === origin}
                        onChange={(e) => setSelectedOrigin(e.target.value)}
                      />
                      {origin}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="col l-10 m-12 c-12">
            <div className="home-filter hide-on-mobile-tablet">
              <div className="home-filter-control">
                <p className="home-filter-title">Sắp xếp theo</p>
                <button className="btn btn--primary home-filter-btn" onClick={shuffleProducts}>Phổ biến</button>
                <button className="btn home-filter-btn" onClick={shuffleProducts}>Mới nhất</button>
                <button className="btn home-filter-btn" onClick={shuffleProducts}>Bán chạy</button>
                <div className="btn home-filter-sort">
                  <p className="home-filter-sort-btn" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Lượt bán {sortOrder === 'asc' ? 'Tăng dần' : sortOrder === 'desc' ? 'Giảm dần' : ''}
                  </p>
                  <i className="fas fa-sort-amount-down-alt"></i>
                  <ul className="home-filter-sort-list">
                    <li>
                      <a
                        href="#"
                        className="home-filter-sort-item-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setSortOrder('asc');
                        }}
                      >
                        Tăng dần <i className="fas fa-sort-amount-up-alt"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="home-filter-sort-item-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setSortOrder('desc');
                        }}
                      >
                        Giảm dần <i className="fas fa-sort-amount-down-alt"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="home-filter-page">
                <div className="home-filter-page-number">
                  <p className="home-filter-page-now">{currentPage}</p>/{totalPages || 1}
                </div>
                <div className="home-filter-page-control">
                  <a
                    href="#"
                    className={`home-filter-page-btn ${currentPage === 1 ? 'home-filter-page-btn--disable' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <i className="fas fa-angle-left"></i>
                  </a>
                  <a
                    href="#"
                    className={`home-filter-page-btn ${currentPage === totalPages ? 'home-filter-page-btn--disable' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <i className="fas fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="home-product">
              <nav className="mobile-category"></nav>
              <div id="list-product" className="row sm-gutter">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                ) : (
                  <p>Không tìm thấy sản phẩm nào.</p> // Thông báo khi không có kết quả
                )}
              </div>
            </div>
            <ul className="pagination home-product-pagination">
              <li className="pagination-item">
                <a
                  href="#"
                  className={`pagination-item-link ${currentPage === 1 ? 'pagination-item-link--disable' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </a>
              </li>
              {pageNumbers.map((page, index) => (
                <li
                  key={index}
                  className={`pagination-item ${currentPage === page ? 'pagination-item--active' : ''}`}
                >
                  {page === '...' ? (
                    <span className="pagination-item-link">{page}</span>
                  ) : (
                    <a href="#" className="pagination-item-link" onClick={() => handlePageChange(page)}>
                      {page}
                    </a>
                  )}
                </li>
              ))}
              <li className="pagination-item">
                <a
                  href="#"
                  className={`pagination-item-link ${currentPage === totalPages ? 'pagination-item-link--disable' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;