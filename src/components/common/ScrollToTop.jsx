import { useEffect } from 'react';
import { useLocation } from 'react-router';


function ScrollToTop() {
  // 1. 取得當前網址資訊
  const { pathname } = useLocation();

  // 2. 設置副作用：在 pathname 改變時執行
  useEffect(() => {
    // 3. 執行滾動行為：將網頁滾動到最頂部 (0, 0)
    window.scrollTo(0, 0); 
    // 或者使用更平滑的動畫：
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }, [pathname]); // 依賴項：只有當 pathname 改變時才執行

  // 這個組件不需要渲染任何東西
  return null;
}

export default ScrollToTop;