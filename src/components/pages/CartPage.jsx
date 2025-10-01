import {  useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";

export default function CartPage() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [cartData, setCartData] = useState({});
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  // const [qtySelect, setQtySelect] = useState(1);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();
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
  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartData(res.data.data);
      dispatch(updateCartData(res.data.data));
    } catch {
      alert("購物車載入失敗");
    }
  };

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

  //結帳api
  // const checkout = async (data) => {
  //   const { message, ...user } = data;
  //   setIsScreenLoading(true);
  //   try {
  //     await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order/`, {
  //       data: {
  //         user,
  //         message,
  //       },
  //     });
  //     getCart();
  //     reset();
  //   } catch (error) {
  //     alert("送出表單失敗");
  //   } finally {
  //     setIsScreenLoading(false);
  //   }
  // };
  // const onSubmit = (data) => {
  //   checkout(data);
  // };

  //清空購物車
  // const removeCart = async () => {
  //   setIsScreenLoading(true);
  //   try {
  //     await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
  //     getCart();
  //   } catch (error) {
  //     alert("清空失敗");
  //   } finally {
  //     setIsScreenLoading(false);
  //   }
  // };

  //刪除單一購物車
  const removeCartItem = async (id) => {
    setIsScreenLoading(true);
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
      getCart();
    } catch {
      alert("刪除失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  //更新購物車
  const updateCartItem = async (cartId, productId, qty) => {
    setIsScreenLoading(true);
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`, {
        data: {
          product_id: productId,
          qty: qty,
        },
      });
      getCart();
    } catch {
      alert("更新失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 計算小計
  const subTotal = () => {
    let calcTotal = cartData.total - cartData.final_total;
    return calcTotal.toLocaleString();
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="mt-3">
          <h3 className="mt-3 mb-4">購物車</h3>
          <div className="row">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 ps-0">
                      產品名稱
                    </th>
                    <th scope="col" className="border-0">
                      數量
                    </th>
                    <th scope="col" className="border-0">
                      價格
                    </th>
                    <th scope="col" className="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.carts?.map((cartItem) => {
                    return (
                      <tr
                        key={cartItem.id}
                        className="border-bottom border-top"
                      >
                        <th
                          scope="row"
                          className="border-0 px-0 font-weight-normal py-4"
                        >
                          <img
                            src={cartItem.product.imageUrl}
                            alt=""
                            style={{
                              width: "72px",
                              height: "72px",
                              objectFit: "cover",
                            }}
                          />
                          <p className="mb-0 fw-bold ms-3 d-inline-block">
                            {cartItem.product.title}
                          </p>
                        </th>
                        <td
                          className="border-0 align-middle"
                          style={{ maxWidth: "160px" }}
                        >
                          <div className="input-group pe-5">
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-dark border-0 py-2"
                                type="button"
                                id="button-addon1"
                                disabled={cartItem.qty === 1}
                                onClick={() => {
                                  updateCartItem(
                                    cartItem.id,
                                    cartItem.product_id,
                                    cartItem.qty - 1
                                  );
                                }}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control border-0 text-center my-auto shadow-none"
                              placeholder=""
                              aria-label="Example text with button addon"
                              aria-describedby="button-addon1"
                              value={cartItem.qty}
                              readOnly
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-dark border-0 py-2"
                                type="button"
                                id="button-addon2"
                                onClick={() => {
                                  updateCartItem(
                                    cartItem.id,
                                    cartItem.product_id,
                                    cartItem.qty + 1
                                  );
                                }}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="border-0 align-middle">
                          <p className="mb-0 ms-auto">
                            NT${cartItem.final_total.toLocaleString()}
                          </p>
                        </td>
                        <td className="border-0 align-middle">
                          <button
                            className="btn btn-outline-dark border-0 py-2"
                            type="button"
                            id="button-addon2"
                            onClick={() => {
                              removeCartItem(cartItem.id);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="input-group w-50 mb-3">
                <input
                  type="text"
                  className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                  placeholder="優惠卷代碼"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">訂單資訊</h4>
                <table className="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px- font-weight-normal"
                      >
                        小計
                      </th>
                      <td className="text-end border-0 px-0">
                        NT${cartData?.total?.toLocaleString()}
                      </td>
                    </tr>

                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0  font-weight-normal"
                      >
                        {cartData.carts?.[0]?.coupon?.percent &&
                          ` - 優惠券 ${
                            100 - cartData.carts[0].coupon.percent
                          }%`}
                      </th>
                      <td className="text-end border-0 px-0 pt-0 ">
                        {cartData.carts?.[0]?.coupon?.code &&
                          ` NT$${subTotal()}`}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總計</p>
                  <p className="mb-0 h4 fw-bold">
                    NT${cartData?.final_total?.toLocaleString()}
                  </p>
                </div>
                <Link to="/checkout-form" className="btn btn-dark w-100 mt-4">
                  結帳
                </Link>
              </div>
            </div>
          </div>
          <div className="my-5">
            <h3 className="fw-bold">其他人也選了...</h3>
            <div ref={swiperRef} className="swiper mt-4 mb-5">
              <div className="swiper-wrapper">
                {allProducts.slice(0, 6).map((product) => (
                  <div className="swiper-slide" key={product.id}>
                    <div className="card border-0 mb-4 position-relative" style={{ minHeight: '500px' }}>
                      <img
                        src={product.imageUrl}
                        className="card-img-top rounded-0 overflow-hidden"
                        alt={product.title}
                        style={{ height: '300px', objectFit: 'cover' }}
                      />
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </h4>
                        <p className="card-text mb-0">
                          NT${product.price?.toLocaleString()}
                          {product.origin_price && (
                            <span className="text-muted ">
                              <del>
                                NT${product.origin_price?.toLocaleString()}
                              </del>
                            </span>
                          )}
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
    </div>
  );
}
