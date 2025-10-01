import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const [wishList, setWishList] = useState(() => {
    const initWishList = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : {};

    return initWishList;
  });

  const toggleWishListItem = (product_id) => {
    const newWishList = {
      ...wishList,
      [product_id]: !wishList[product_id],
    };
    localStorage.setItem("wishList", JSON.stringify(newWishList));
    setWishList(newWishList);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsScreenLoading(true);
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
        setAllProducts(res.data.products);
      } catch  {
        // alert("取得產品失敗");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const categories = [
    "全部",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("全部");
  const filteredProducts =
    selectedCategory === "全部"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="container-fluid p-0">
      {/* 橫幅區域 */}
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ 
          minHeight: "400px",
          backgroundImage: "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        ></div>
        <div className="position-relative text-center">
          <h2 className="fw-bold mb-3">探索精彩旅程</h2>
          <p className="text-muted mb-0">找尋屬於您的完美行程</p>
        </div>
      </div>

      {/* 主要內容區 */}
      <div className="container py-7">
        <div className="row">
          {/* 側邊分類欄 */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="h5 mb-0">旅遊分類</h4>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`list-group-item list-group-item-action border-0 ${
                        selectedCategory === category ? 'active' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 產品列表 */}
          <div className="col-lg-9">
            <div className="row g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-md-6 col-lg-4" key={product.id}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="position-relative overflow-hidden">
                        <img
                          src={product.imageUrl}
                          className="card-img-top"
                          alt={product.title}
                          style={{ 
                            height: "250px",
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => toggleWishListItem(product.id)}
                          className={`btn position-absolute top-0 end-0 m-3 ${
                            wishList[product.id] ? 'text-danger' : 'text-white'
                          }`}
                          style={{ zIndex: 100 }}  // 加入 z-index
                        >
                          <i className={`${wishList[product.id] ? 'fas' : 'far'} fa-heart fa-lg`}></i>
                        </button>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mb-3">
                          <Link 
                            to={`/products/${product.id}`}
                            className="text-dark text-decoration-none stretched-link"
                          >
                            {product.title}
                          </Link>
                        </h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-primary fw-bold mb-0">
                              NT${product.price?.toLocaleString()}
                            </p>
                            {product.origin_price && (
                              <small className="text-muted text-decoration-line-through">
                                NT${product.origin_price?.toLocaleString()}
                              </small>
                            )}
                          </div>
                          <span className="badge bg-primary">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col text-center py-5">
                  <p className="text-muted mb-0">目前沒有相關商品</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading 遮罩 */}
      {isScreenLoading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1050
          }}
        >
          <ReactLoading type="spin" color="#0d6efd" width="3rem" height="3rem" />
        </div>
      )}
    </div>
  );
}
