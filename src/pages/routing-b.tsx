import RouteDemoNav from "../components/RouteDemoNav";

// App.tsx -> "/routing-b" 자동 라우팅 · prerender.js -> dist/static/routing-b.html
const RoutingB: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold">🅱️ B 페이지</h1>
      <p className="max-w-md text-center text-sm leading-relaxed text-gray-400">
        위 링크로 A↔B 를 오가보세요. URL 은 바뀌는데 화면이 깜빡이지 않고
        load-id 도 그대로면 = 서버에 새 HTML 을 요청하지 않은{" "}
        <b className="text-sky-300">클라이언트 라우팅</b>입니다. 여기서 <b>F5</b> 를
        누르면 load-id 가 바뀌는데 = 서버에서 이 경로의 HTML 을 통째로 받아온 것.
      </p>
      <RouteDemoNav />
    </div>
  );
};

export default RoutingB;
