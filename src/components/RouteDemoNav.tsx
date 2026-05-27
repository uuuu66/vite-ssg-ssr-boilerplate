import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * 라우팅 방식을 "눈으로 보여주는" 데모용 내비게이션.
 *
 * - <Link> 클릭 = 클라이언트 라우팅(CSR): React Router 가 history.pushState 로
 *   URL "만" 바꾸고 서버에 새 HTML 을 요청하지 않는다. 화면 깜빡임도 없다.
 * - 브라우저 새로고침(F5) / 주소 직접 입력 = 풀 페이지 로드: 서버(SSR) 또는
 *   정적 파일(SSG)에서 그 경로의 HTML 을 통째로 다시 받아온다.
 *
 * 아래 module-scope 값들은 "번들이 평가되는 순간"(=풀 페이지 로드) 기준으로 살아있다.
 * 클라이언트 라우팅은 번들을 다시 로드하지 않으므로 값이 유지되고,
 * 새로고침/주소 직접 입력은 번들을 다시 평가하므로 초기화된다.
 */
let pageLoadId = ""; // 이 "문서"의 고유 id (F5 하면 바뀜, 링크 클릭으론 유지)
let clientNavCount = 0; // 링크 클릭으로 이동한 횟수
let lastSeenPath: string | null = null;

const linkClass = (active: boolean) =>
  `px-4 py-2 rounded-lg text-sm font-semibold transition ${
    active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
  }`;

const RouteDemoNav: React.FC = () => {
  const location = useLocation();
  const [, force] = useState(0);

  // 이 effect 는 브라우저(하이드레이션 후)에서만 돈다 → 서버 렌더 결과엔 영향 없음.
  // pageLoadId 를 effect 에서 채우는 이유: 서버/클라가 서로 다른 난수를 렌더하면
  // 하이드레이션 mismatch 가 나므로, 서버·클라 첫 렌더는 둘 다 "…" 로 맞춘 뒤 채운다.
  useEffect(() => {
    if (!pageLoadId) pageLoadId = Math.random().toString(36).slice(2, 7);

    if (lastSeenPath === null) {
      lastSeenPath = location.pathname; // 이 문서에서 처음 본 경로 = 풀 로드 지점
    } else if (location.pathname !== lastSeenPath) {
      clientNavCount += 1; // 경로가 바뀜 = 링크로 이동(클라이언트 라우팅)
      lastSeenPath = location.pathname;
    }
    force((n) => n + 1); // module-scope 값 갱신을 화면에 반영
  }, [location.pathname]);

  const viaClientNav = clientNavCount > 0;

  return (
    <nav className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className={linkClass(location.pathname === "/")}>
          홈 (/)
        </Link>
        <Link
          to="/ssg-ssr"
          className={linkClass(location.pathname === "/ssg-ssr")}
        >
          A (/ssg-ssr)
        </Link>
        <Link
          to="/routing-b"
          className={linkClass(location.pathname === "/routing-b")}
        >
          B (/routing-b)
        </Link>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm">
        <div>
          현재 경로: <code className="text-emerald-300">{location.pathname}</code>
        </div>
        <div>
          이 문서 load-id:{" "}
          <code className="text-fuchsia-300">{pageLoadId || "…"}</code>{" "}
          <span className="text-gray-500">
            (F5 하면 바뀜 · 링크 클릭으론 그대로)
          </span>
        </div>
        <div>
          도달 방식:{" "}
          {viaClientNav ? (
            <b className="text-sky-300">
              🧭 JS 라우팅 — 서버 요청 없음 · {clientNavCount}번 이동
            </b>
          ) : (
            <b className="text-amber-300">📦 풀 페이지 로드 — 서버에서 HTML 받음</b>
          )}
        </div>
      </div>
    </nav>
  );
};

export default RouteDemoNav;
