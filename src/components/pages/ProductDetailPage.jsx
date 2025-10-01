import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useParams } from "react-router";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductDetailPage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qtySelect, setQtySelect] = useState(1);
  const [product, setProduct] = useState([]);
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getCart();
    new Swiper(swiperRef.current, {
      modules: [Autoplay],
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 10,
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }, []);
  //呼叫購物車
  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch(updateCartData(res.data.data));
    } catch {
      alert("購物車載入失敗");
    }
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);
  //加入購物車
  const addCartItem = async (productId, qty) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id: productId,
          qty: Number(qty),
        },
      });
      getCart();
    } catch {
      alert("加入購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };
  //取得產品
  useEffect(() => {
    const getProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/product/${productId}`
        );
        setProduct(res.data.product);
      } catch {
        alert("取得產品失敗");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProducts();
  }, [productId]);

  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
        setAllProducts(res.data.products);
      } catch {
        // alert("取得產品失敗");
      }
    };
    getAllProducts();
  }, []);

  const swiperRef = useRef(null);

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="container">
          {/* 麵包屑導航 */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb bg-transparent px-0 mb-0">
              <li className="breadcrumb-item">
                <Link className="text-primary" to="/">首頁</Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-primary" to="/products">產品列表</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          {/* 產品主要資訊區 */}
          <div className="row align-items-start">
            {/* 左側輪播圖 */}
            <div className="col-md-7">
              <div className="card border-0 shadow-sm">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.imagesUrl ? (
                      product.imagesUrl.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                          <img
                            src={image}
                            className="d-block w-100"
                            alt={`產品圖 ${index + 1}`}
                            style={{ 
                              height: '500px',
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active">
                        <img
                          src={product.imageUrl}
                          className="d-block w-100"
                          alt={product.title}
                          style={{ 
                            height: '500px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 右側產品資訊 */}
            <div className="col-md-5">
              <div className="card border-0 shadow-sm p-4">
                <h2 className="fw-bold h3 mb-3">{product.title}</h2>
                <div className="mb-4">
                  {product.origin_price && (
                    <p className="mb-1 text-muted">
                      <del>NT${product.origin_price?.toLocaleString()}</del>
                    </p>
                  )}
                  <h3 className="text-primary fw-bold">
                    NT${product.price?.toLocaleString()}
                  </h3>
                </div>

                <div className="row gx-2 mb-4">
                  <div className="col-6">
                    <div className="input-group">
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setQtySelect(qtySelect - 1)}
                        disabled={qtySelect === 1}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={qtySelect}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setQtySelect(qtySelect + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <button
                      disabled={isLoading}
                      className="btn btn-primary w-100"
                      onClick={() => addCartItem(product.id, qtySelect)}
                    >
                      {isLoading ? (
                        <ReactLoading type="spin" color="#fff" height={24} width={24} />
                      ) : (
                        <>
                          <i className="fas fa-shopping-cart me-2"></i>
                          加入購物車
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="border-top pt-4">
                  {/* <h4 className="h6 mb-3">產品說明</h4> */}
                  <p className="text-muted">{product.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 產品詳細內容 */}
          <div className="card border-0 shadow-sm p-4 mt-4">
            <h3 className="h4 mb-4">行程資訊</h3>
            <p className="text-muted">{product.content}</p>
          </div>

          {/* 其他熱門選擇 */}
          <div className="mt-5">
            <h3 className="h4 mb-4">其他熱門選擇</h3>
            <div ref={swiperRef} className="swiper">
              <div className="swiper-wrapper">
                {allProducts.slice(0, 6).map((product) => (
                  <div className="swiper-slide" key={product.id}>
                    <Link 
                      to={`/products/${product.id}`}
                      className="card border-0 shadow-sm h-100 text-decoration-none"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={product.imageUrl}
                          className="card-img-top"
                          alt={product.title}
                          style={{ 
                            height: '200px',
                            objectFit: 'cover',
                            transition: 'transform 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-dark">{product.title}</h5>
                        <p className="card-text text-primary fw-bold mb-0">
                          NT${product.price?.toLocaleString()}
                          {product.origin_price && (
                            <small className="text-muted text-decoration-line-through ms-2">
                              NT${product.origin_price?.toLocaleString()}
                            </small>
                          )}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
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
    </>
  );
}
