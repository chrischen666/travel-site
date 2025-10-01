import logo from "../../assets/images/world.png";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const routes = [
  { path: "/", name: "首頁" },
  { path: "products", name: "產品列表" },
  { path: "cart", name: "購物車" },
];

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
import { useDispatch } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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

  const carts = useSelector((state) => {
    return state.cart.carts;
  });

  return (
    <div className="bg-primary">
      <div className="container d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            <div className="d-flex align-items-center">
              <img
                src={logo}
                className="object-fit-contain"
                style={{ width: "60px" }}
                alt="全球旅遊"
              />
              <h3 className="text-white mb-0">好遊網</h3>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNavAltMarkup"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${isOpen ? 'show' : ''}`}
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              {routes.map((route) => {
                return (
                  <NavLink
                    key={route.path}
                    className="nav-item nav-link me-4 text-white"
                    to={route.path}
                  >
                    {route.name === "購物車" ? (
                      <div className="position-relative">
                        <i className="fas fa-shopping-cart"></i>
                        <span
                          className="position-absolute badge text-bg-success rounded-circle"
                          style={{
                            bottom: "12px",
                            left: "12px",
                          }}
                        >
                          {carts?.length}
                        </span>
                      </div>
                    ) : (
                      route.name
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}