import RouteDemoNav from "../components/RouteDemoNav";
import SsgSsrDemo from "../components/SsgSsrDemo";

// 이 파일이 곧 라우트가 된다.
//   App.tsx        -> "/ssg-ssr" 로 자동 라우팅
//   prerender.js   -> dist/static/ssg-ssr.html 로 자동 프리렌더(SSG)
//   server.js      -> 요청 시 SSRRender("/ssg-ssr") 로 즉석 렌더(SSR)
const SsgSsr: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-12 bg-black text-white py-16">
      <h1 className="text-3xl font-bold">🅰️ A 페이지</h1>
      <RouteDemoNav />
      <SsgSsrDemo />
    </div>
  );
};

export default SsgSsr;
