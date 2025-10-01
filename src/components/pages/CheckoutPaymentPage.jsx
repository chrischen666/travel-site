import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const userData = useSelector((state) => {
    return state.user;
  });
  const { name, email, message, tel, address } = userData;
  const handleOrderItem = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, {
        data: {
          user: {
            name: name,
            email: email,
            tel: tel,
            address: address,
          },
          message: message,
        },
      });
      navigate("/checkout-success");
    } catch {
      alert("結帳失敗");
    }
  };

  const cart = useSelector((state) => {
    return state.cart;
  });

  const [selectPayment, setSelectPayment] = useState("Apple Pay");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <nav className="navbar navbar-expand-lg navbar-light px-0">
            {/* <a className="navbar-brand" href="./index.html">
              Navbar
            </a> */}
            <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle  d-md-inline d-block text-center"></i>
                <span className="text-nowrap">填寫結帳資訊</span>
              </li>
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle text-success d-md-inline d-block text-center"></i>
                <span className="text-nowrap">支付方式</span>
              </li>
              <li>
                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">結帳成功</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-4 pt-3">選擇支付方式</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            {cart.carts.length > 0 &&
              cart.carts.map((item) => {
                return (
                  <div className="d-flex mb-2 gap-2" key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      // className="me-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        minWidth: "60px", // 加入最小寬度
                        minHeight: "60px",
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between">
                        <p className="mb-0 fw-bold">{item.product.title}</p>
                        <p className="mb-0">
                          NT${item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="mb-0 fw-bold">x{item.qty}</p>
                    </div>
                  </div>
                );
              })}

            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    小計
                  </th>
                  <td className="text-end border-0 px-0 pt-4">
                    NT${cart.total?.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    支付方式
                  </th>
                  <td className="text-end border-0 px-0 pt-4">
                    {selectPayment}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總計</p>
              <p className="mb-0 h4 fw-bold">
                NT${cart.final_total?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="accordion" id="accordionExample">
            <div className="card rounded-0">
              <div
                onClick={() => setSelectPayment("Apple Pay")}
                className="card-header bg-white border-0 py-3"
                id="headingOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  Apple Pay
                </p>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body bg-light ps-5 py-4">
                  <div className="mb-0">
                    <label htmlFor="Lorem ipsum2" className="text-muted mb-0">
                      信用卡號
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Lorem ipsum2"
                      placeholder="信用卡號"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card rounded-0">
              <div
                onClick={() => setSelectPayment("Line Pay")}
                className="card-header bg-white border-0 py-3 collapsed"
                id="headingTwo"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  Line Pay
                </p>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body bg-light ps-5 py-4">
                  <div className="mb-2">
                    <label htmlFor="Lorem ipsum1" className="text-muted mb-0">
                      信用卡號
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Lorem ipsum1"
                      placeholder="信用卡號"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
            <Link to="/checkout-form" className="text-dark mt-md-0 mt-3">
              <i className="fas fa-chevron-left me-2"></i> 上一步
            </Link>
            <button
              onClick={() => handleOrderItem()}
              href="./checkout-success.html"
              className="btn btn-dark py-3 px-7"
            >
              結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
