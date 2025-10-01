import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faShieldHeart, faAward } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 const reviews = [
    {
      id: 1,
      name: "陳小明",
      date: "2025-09-10",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      text: "行程安排很順暢，導遊親切，住宿舒適，值得推薦！",
      rating: 5,
    },
    {
      id: 2,
      name: "李婷婷",
      date: "2025-08-26",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      text: "景點豐富但節奏剛好，整體體驗超乎期待。",
      rating: 4,
    },
    {
      id: 3,
      name: "王大華",
      date: "2025-07-14",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      text: "客服回覆快速，出發前說明清楚，適合家庭出遊。",
      rating: 5,
    },
    {
      id: 4,
      name: "張小芸",
      date: "2025-06-02",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      text: "美食豐富但行程稍微緊湊，下次會選長一點的行程。",
      rating: 4,
    },
    {
      id: 5,
      name: "林志明",
      date: "2025-05-15",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      text: "價格實惠，行程豐富，導遊專業又熱情。",
      rating: 5,
    },
    {
      id: 6,
      name: "黃雅琪",
      date: "2025-04-28",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
      text: "整體服務很好，特別喜歡安排的在地美食體驗！",
      rating: 5,
    },
  ];
export default function HomePage() {
  
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

  return (
    <div className="container-fluid">
      <div
        className="position-absolute"
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1662553339201-442516ef313d?q=80&w=3611&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundPosition: "center center",
          opacity: 0.9,
          zIndex: -1,
        }}
      ></div>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <div className="row justify-content-center my-auto">
          <div className="col-md-4 text-center text-white">
            <h2>啟動您的全球旅程</h2>
            <p className="mb-0 text-white">馬上開始選擇你的旅程！</p>
            <Link
              to="/products"
              className="btn btn-secondary text-white fs-5 rounded-0 mt-6 px-6 py-2"
            >
              立即前往選擇景點
            </Link>
          </div>
        </div>
      </div>
      <div className="container pt-lg-7 py-6">
        <h2 className="text-center text-primary">為何選擇好遊網？</h2>

        {/* 為何選擇好遊網 */}
        <div className="row mt-5">
          <div className="col-md-4 mt-md-4 mb-4 mb-md-0">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon icon={faPlaneDeparture} className="fa-3x text-primary mb-3" />
                <h4 className="text-primary mb-3">全球套票，一站式預訂</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-start mb-0 fs-5">
                    「好遊網」提供豐富多樣的全球旅遊套票。
                    無論您想前往哪個國家，都能在這裡找到合適的行程。
                    從機票、住宿門票到當地體驗，所有行程細節都能一次搞定。
                    省去您分別預訂的麻煩，讓您的旅行規劃更輕鬆、更便捷。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-md-4 mb-4 mb-md-0">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon icon={faShieldHeart} className="fa-3x text-primary mb-3" />
                <h4 className="text-primary mb-3">價格透明，安心有保障</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-start mb-0 fs-5">
                    我們堅持價格透明化，所有套票費用都清楚列出，絕無隱藏費用。
                    與多家知名旅遊供應商合作，提供安全可靠的預訂服務，讓您安心享受每一段旅程。
                    並且我們有完善的退訂機制，讓您預訂後無後顧之憂。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-md-4 mb-4 mb-md-0">
            <div className="card shadow h-100">
              <div className="card-body text-center">
                <FontAwesomeIcon icon={faAward} className="fa-3x text-primary mb-3" />
                <h4 className="text-primary mb-3">精選行程，品質保證</h4>
                <div className="d-flex justify-content-between">
                  <p className="card-text text-start mb-0 fs-5">
                    「好遊網」的每一項套票都是由專業團隊精心挑選，確保您獲得高品質的旅行體驗。
                    我們與全球優質的旅遊供應商合作，提供舒適的住宿、安全的交通和豐富的活動。
                    讓您能夠在有限的時間裡，體驗到最棒的旅遊。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-7">
        <h2 className="text-center text-primary mb-5">精選行程</h2>
        {/* 桌面版顯示 */}
        <div className="row d-none d-md-flex">
          {allProducts.slice(0, 6).map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="text-decoration-none text-dark"
              >
                {/* 原有的卡片內容 */}
                <div className="card h-100 shadow">
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={product.imageUrl}
                      className="card-img-top img-fluid mh-100"
                      style={{ 
                        height: "250px", 
                        objectFit: "cover",
                        transition: "transform 0.3s ease-in-out"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      alt={product.title || "精選行程"}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text flex-grow-1">{product.description}</p>

                    {/* 價格區塊：顯示原價（若有）與售價 */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      {product.origin_price ? (
                        <small className="text-muted text-decoration-line-through">
                          NT${product.origin_price.toLocaleString()}
                        </small>
                      ) : (
                        <span></span>
                      )}
                      <h5 className="text-primary mb-0">
                        NT${product.price.toLocaleString()}
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 手機版 Swiper */}
        <div className="d-md-none">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
          >
            {allProducts.slice(0, 6).map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 shadow" style={{ minHeight: '500px' }}>  {/* 加入最小高度 */}
                    <div style={{ overflow: "hidden" }}>
                      <img
                        src={product.imageUrl}
                        className="card-img-top img-fluid"
                        style={{ 
                          height: "250px", 
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        alt={product.title || "精選行程"}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text flex-grow-1">{product.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        {product.origin_price ? (
                          <small className="text-muted text-decoration-line-through">
                            NT${product.origin_price.toLocaleString()}
                          </small>
                        ) : (
                          <span></span>
                        )}
                        <h5 className="text-primary mb-0">
                          NT${product.price.toLocaleString()}
                        </h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

         {/* 新增：顧客評價區塊 */}
      <div className="container py-6">
        <h2 className="text-center text-primary mb-5">我們的旅程，由您見證</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.id}>
              <div className="card h-100 shadow-sm p-3" style={{ minHeight: '250px' }}>
                <div className="d-flex flex-column h-100">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="rounded-circle me-3"
                      style={{ width: 56, height: 56, objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0">{r.name}</h6>
                      <small className="text-muted">{r.date}</small>
                    </div>
                  </div>
                  <div className="flex-grow-1 d-flex flex-column">
                    {/* 星等顯示 */}
                    <div className="text-warning mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < r.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p className="mb-0 flex-grow-1">{r.text}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 常見問題區塊 */}
      <div className="container py-6">
        <h2 className="text-center text-primary mb-5">常見問題</h2>
        <div className="row justify-content-center">
          <div className="col">
            <div className="accordion" id="faqAccordion">
              {/* 問題 1 */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed bg-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                  >
                    <h5 className="mb-0"><strong>Q. 如何預訂我心儀的旅遊行程？</strong></h5>
                  </button>
                </h2>
                <div
                  id="faq1"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    只需在網站上選擇您喜愛的行程，點選「立即預訂」，依照指示填寫必要資訊並完成付款，即可輕鬆完成預訂。整個過程簡單直覺，讓您輕鬆規劃旅程。
                  </div>
                </div>
              </div>

              {/* 問題 2 */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed bg-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                  >
                    <h5 className="mb-0"><strong>Q. 套裝行程費用包含哪些項目？</strong></h5>
                  </button>
                </h2>
                <div
                  id="faq2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    我們的套裝行程費用通常包含：來回機票、當地交通接送、住宿安排、行程中提及的景點門票，以及專業導遊服務。個人消費、自選行程和餐食費用則需要另行支付。
                  </div>
                </div>
              </div>

              {/* 問題 3 */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed bg-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                  >
                    <h5 className="mb-0"><strong>Q. 出發前需要準備什麼文件？</strong></h5>
                  </button>
                </h2>
                <div
                  id="faq3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    請準備：有效期限六個月以上的護照、目的地簽證（如需要）、訂購確認信、旅遊保險證明、以及其他目的地可能要求的相關文件。建議您在出發前仔細檢查所有必要文件。
                  </div>
                </div>
              </div>

              {/* 問題 4 */}
              <div className="accordion-item border-0 mb-3 shadow-sm">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed bg-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq4"
                  >
                    <h5 className="mb-0"><strong>Q. 行程可以客製化嗎？</strong></h5>
                  </button>
                </h2>
                <div
                  id="faq4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    當然可以！我們提供客製化服務，無論是特殊飲食需求、行動不便協助，或是想要打造專屬行程，都歡迎與我們的客服團隊聯繫，我們會根據您的需求提供最適合的安排。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
