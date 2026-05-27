import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// [교육용 장치] 하이드레이션을 일부러 늦춰서, JS 가 붙기 전의 "죽은 HTML" 구간을
// 눈으로 볼 수 있게 한다. 이 시간 동안 버튼을 눌러도 아무 일도 일어나지 않는다.
// 실제 서비스에서는 0 으로 두면 (번들 로드 직후) 즉시 하이드레이션된다.
const HYDRATION_DELAY_MS = 5500;

function hydrate() {
  // render() 가 아니라 hydrateRoot() 인 것이 핵심.
  // DOM 을 새로 만들지 않고, 서버가 보내준 기존 DOM 에 이벤트/상태만 입힌다.
  ReactDOM.hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

if (HYDRATION_DELAY_MS > 0) {
  setTimeout(hydrate, HYDRATION_DELAY_MS);
} else {
  hydrate();
}
