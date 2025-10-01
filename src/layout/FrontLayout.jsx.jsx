import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router";

function FrontLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default FrontLayout;
