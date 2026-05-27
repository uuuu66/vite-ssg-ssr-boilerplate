import { Link } from "react-router-dom";

// 빌드 때 prerender 되지 않은 경로. 클릭(CSR)으론 둘 다 보이지만,
// 직접 진입(풀 로드)하면 SSG/SSR 이 갈리는 지점이다.
const NOT_PRERENDERED = "/dynamic/hello-from-url";

const RoutingModeDemo: React.FC = () => {
  return (
    <div className="flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
      <h2 className="text-2xl font-bold">🔀 SSG 라우팅 vs SSR 라우팅</h2>

      <p className="text-sm leading-relaxed text-gray-300">
        아래는 <b>빌드 때 prerender 되지 않은 경로</b>(
        <code className="text-emerald-300">{NOT_PRERENDERED}</code>)예요. 같은 경로를
        두 가지 방식으로 열어보세요.
      </p>

      <div className="grid w-full gap-4 text-left sm:grid-cols-2">
        {/* ① 클라이언트 라우팅 — 서버에 묻지 않으므로 둘 다 동일 */}
        <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4">
          <div className="mb-1 font-semibold text-sky-300">① 링크 클릭 (CSR)</div>
          <Link to={NOT_PRERENDERED} className="text-sky-200 underline">
            {NOT_PRERENDERED} 로 이동 →
          </Link>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            React Router 가 pushState 로 처리 → <b>SSG·SSR 둘 다 똑같이</b> 화면이
            뜸 (서버에 묻지 않으니까).
          </p>
        </div>

        {/* ② 직접 진입(풀 로드) — 여기서 SSG/SSR 이 갈린다 */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <div className="mb-1 font-semibold text-amber-300">
            ② 직접 진입 (풀 로드)
          </div>
          <a
            href={NOT_PRERENDERED}
            target="_blank"
            rel="noreferrer"
            className="text-amber-200 underline"
          >
            새 탭에서 {NOT_PRERENDERED} 열기 ↗
          </a>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            서버/파일에 직접 요청 → 여기서 갈림:
            <br />·{" "}
            <b className="text-emerald-300">SSR</b>: 서버가 즉석 렌더 →{" "}
            <b>정상(200)</b>
            <br />·{" "}
            <b className="text-red-400">SSG</b>: 그 .html 이 없음 → <b>404</b>
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        핵심: SSG 는 <b>빌드 때 안 경로만</b> 직접 열 수 있고(파일이 그만큼만 존재),
        SSR 은 <code>app.use("*")</code> 로 <b>아무 경로나</b> 그 자리에서 만들어 준다.
      </p>
    </div>
  );
};

export default RoutingModeDemo;
