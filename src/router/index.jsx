import { createHashRouter } from "react-router";
import FrontLayout from "../layout/FrontLayout.jsx.jsx";
import HomePage from "../components/pages/HomePage.jsx";
import ProductsPage from "../components/pages/ProductsPage.jsx";
import ProductDetailPage from "../components/pages/ProductDetailPage.jsx";
import CheckoutPaymentPage from "../components/pages/CheckoutPaymentPage.jsx";
import CheckoutSuccessPage from "../components/pages/CheckoutSuccessPage.jsx";
import CartPage from "../components/pages/CartPage.jsx";
import CheckoutFormPage from "../components/pages/CheckFormPage.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

// 路由表
const router = createHashRouter([
  {
    path: "/",
    element: <>
      <FrontLayout />
      <ScrollToTop />
    </>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout-form",
        element: <CheckoutFormPage />,
      },
      {
        path: "checkout-payment",
        element: <CheckoutPaymentPage />,
      },
      {
        path: "checkout-success",
        element: <CheckoutSuccessPage />,
      },
    ],
  },
]);

export default router;
