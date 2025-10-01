import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { updateUserData } from "../../redux/userSlice";

export default function CheckoutFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (user) => {
    dispatch(updateUserData(user));
    navigate("/checkout-payment");
  };

  const cart = useSelector((state) => {
    return state.cart;
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <nav className="navbar navbar-expand-lg navbar-light px-0">
            <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle text-success d-md-inline d-block text-center"></i>
                <span className="text-nowrap">填寫結帳資訊</span>
              </li>
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
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
          <h3 className="fw-bold mb-4 pt-3">填寫結帳資訊</h3>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>聯絡資訊</p>
            <div className="mb-0">
              <label htmlFor="ContactMail" className="text-muted mb-0">
                電子郵件
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "email必填",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "email格式錯誤",
                  },
                })}
                type="email"
                className="form-control"
                id="ContactMail"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="text-danger my-2">{errors.email?.message}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="ContactName" className="text-muted mb-0">
                姓名
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "姓名必填",
                  },
                })}
                type="text"
                className="form-control"
                id="ContactName"
                placeholder="請輸入姓名"
              />
              {errors.name && (
                <p className="text-danger my-2">{errors.name?.message}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="ContactName" className="text-muted mb-0">
                地址
              </label>
              <input
                {...register("address", {
                  required: {
                    value: true,
                    message: "地址必填",
                  },
                })}
                type="text"
                className="form-control"
                id="ContactAddress"
                placeholder="請輸入地址"
              />
              {errors.address && (
                <p className="text-danger my-2">{errors.address?.message}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="ContactTel" className="text-muted mb-0">
                電話
              </label>
              <input
                {...register("tel", {
                  required: {
                    value: true,
                    message: "電話必填",
                  },
                  pattern: {
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: "電話格式錯誤",
                  },
                })}
                type="tel"
                className="form-control"
                id="ContactTel"
                placeholder="請輸入電話"
              />
              {errors.tel && (
                <p className="text-danger my-2">{errors.tel?.message}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="ContactMessage" className="text-muted mb-0">
                留言
              </label>
              <textarea
                {...register("message")}
                className="form-control"
                rows="3"
                id="ContactMessage"
                placeholder=""
              ></textarea>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to="/cart" className="text-dark mt-md-0 mt-3">
                <i className="fas fa-chevron-left me-2"></i>上一步
              </Link>
              <button className="btn btn-dark py-3 px-7">選擇付款方式</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
