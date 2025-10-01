import { Link } from "react-router";


export default function Footer() {
  return (
    <>
      {/* 訂閱區塊 */}
      <div className="bg-light py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
            <p className="mb-0 fw-bold text-primary">訂閱我們，獲取最新旅遊資訊！</p>
            <div className="input-group w-md-50 mt-md-0 mt-3">
              <input
                type="email"
                className="form-control rounded-0"
                placeholder="請輸入 Email 訂閱電子報"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary rounded-0"
                  type="button"
                >
                  立即訂閱
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要頁尾區塊 */}
      <div className="bg-primary py-5">
        <div className="container">
          {/* Logo 和社群媒體連結 */}
          <div className="d-flex align-items-center justify-content-between text-white mb-md-5 mb-4">
            <Link to="/" className="text-decoration-none">
              <h3 className="text-white mb-0">
                <i className="fas fa-globe-americas me-2"></i>
                好遊網
              </h3>
            </Link>
          </div>

          {/* 聯絡資訊和版權宣告 */}
          <div className="row text-white">
            <div className="col-md-4 mb-md-0 mb-4">
              <h5 className="mb-3">聯絡我們</h5>
              <p className="mb-1">
                <i className="fas fa-phone me-2"></i>
                (02) 2345-6789
              </p>
              <p className="mb-1">
                <i className="fas fa-envelope me-2"></i>
                service@travel.com
              </p>
              <p className="mb-0">
                <i className="fas fa-clock me-2"></i>
                週一至週五 09:00-18:00
              </p>
            </div>
            <div className="col-md-4 mb-md-0 mb-4">
              <h5 className="mb-3">社群追蹤</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-facebook me-2"></i>
                    Facebook
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-instagram me-2"></i>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-twitter me-2"></i>
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">關於好遊網</h5>
              <p className="mb-0">
                好遊網致力於提供優質的旅遊體驗，讓每位旅客都能找到最適合的行程，創造難忘的旅遊回憶。
              </p>
            </div>
          </div>

          {/* 版權宣告 */}
          <div className="border-top border-light mt-4 pt-4 text-center text-white">
            <p className="mb-0">© 2025 好遊網 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
