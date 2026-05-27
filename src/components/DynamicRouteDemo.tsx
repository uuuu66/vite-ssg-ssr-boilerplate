import { Link, useLocation } from "react-router-dom";

/**
 * 빌드 때 prerender 되지 않은 "임의 경로"를 위한 catch-all 라우트 화면.
 * App.tsx 에 <Route path="*"> 로 연결된다. src/pages 에 두지 않으므로
 * prerender.js 가 이 경로의 .html 을 만들지 않는다 → 그래서:
 *   - SSR (node server)        : app.use("*") 가 받아 서버가 즉석 렌더 → 이 화면이 200 으로 보인다.
 *   - SSG (serve dist/static)  : 해당 .html 파일이 없으므로 → 이 화면 대신 404 가 뜬다.
 * 즉 "이 화면을 직접 진입/새로고침으로 볼 수 있느냐"가 곧 SSR vs SSG 라우팅 차이다.
 */
const DynamicRouteDemo: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-emerald-950 px-6 text-center text-white">
      <h1 className="text-3xl font-bold">🛤️ 동적 라우트 (prerender 안 됨)</h1>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-4">
        <div className="text-sm text-emerald-300">서버가 받은 경로</div>
        <code className="font-mono text-xl text-emerald-100">
          {location.pathname}
        </code>
      </div>

      <p className="max-w-lg text-sm leading-relaxed text-gray-300">
        이 경로는 <b>빌드 때 .html 로 구워지지 않았어요.</b> 그런데 지금 이 화면이
        보인다는 건 ={" "}
        <b className="text-emerald-300">
          SSR(node server)이 요청을 받아 즉석에서 렌더
        </b>
        했다는 뜻이에요. 같은 URL 을 <b>SSG(serve dist/static)</b>에서 직접 열면 해당
        파일이 없어서 <b className="text-red-400">404</b> 가 뜹니다.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black"
      >
        ← 홈으로
      </Link>
    </div>
  );
};

export default DynamicRouteDemo;
