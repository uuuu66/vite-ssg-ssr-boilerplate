import { Link, useParams } from "react-router-dom";

// 빌드 때 미리 구운 id 목록 (prerender.js 의 STATIC_USER_IDS 와 같아야 한다).
// = Next 의 getStaticPaths / generateStaticParams 가 반환하는 목록에 해당.
const PRERENDERED_IDS = ["1", "2", "3"];

/**
 * Next 의 [id] 에 해당하는 "named 단일 세그먼트 동적 라우트" 예시.
 * App.tsx 에 <Route path="/user/:id"> 로 연결되고, useParams().id 로 값을 뽑는다.
 *
 * - 빌드 때 PRERENDERED_IDS(1·2·3) 만 .html 로 구워둔다 → 그 id 는 SSG 에서도 직접 진입 가능.
 * - 그 외 id(예: 999) 는 파일이 없으므로 SSG 에선 404, SSR(app.use("*")) 에선 즉석 렌더.
 */
const UserDemo: React.FC = () => {
  const { id } = useParams(); // [id] 처럼 named param 추출 (path="/user/:id")
  const wasPrerendered = PRERENDERED_IDS.includes(id ?? "");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-indigo-950 px-6 text-center text-white">
      <h1 className="text-3xl font-bold">👤 /user/:id</h1>

      <div className="rounded-xl border border-indigo-400/40 bg-indigo-400/10 px-8 py-4">
        <div className="text-sm text-indigo-300">useParams().id</div>
        <code className="font-mono text-4xl text-indigo-100">{id}</code>
      </div>

      <div
        className={`rounded-full px-5 py-2 text-sm font-semibold ${
          wasPrerendered ? "bg-emerald-600" : "bg-amber-600"
        }`}
      >
        {wasPrerendered
          ? "📦 빌드 때 미리 구운 id — 정적 .html 존재"
          : "⚡ 미리 굽지 않은 id — SSG면 이 화면은 404, SSR이면 즉석 렌더"}
      </div>

      <p className="max-w-lg text-sm leading-relaxed text-gray-300">
        하나의 <code>/user/:id</code> 라우트가 <b>useParams().id</b> 로 여러 URL 을
        처리해요(= Next 의 <code>[id]</code>). 빌드 때 미리 구운 id 는{" "}
        <code className="text-emerald-300">{PRERENDERED_IDS.join(", ")}</code> 뿐이고,
        이 목록이 곧 Next 의 <code>getStaticPaths</code> 가 하는 일이에요.
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

export default UserDemo;
