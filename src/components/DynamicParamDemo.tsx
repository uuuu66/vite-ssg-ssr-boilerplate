import { Link } from "react-router-dom";

/**
 * Next 의 [id] + getStaticPaths 를 눈으로 보여주는 카드.
 * /user/:id 라우트로, 빌드 때 미리 구운 id(1·2·3)와 안 구운 id(999)를 비교한다.
 * catch-all([...slug])인 RoutingModeDemo 와 달리 "named 단일 세그먼트" 동적 라우트다.
 */
const DynamicParamDemo: React.FC = () => {
  return (
    <div className="flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
      <h2 className="text-2xl font-bold">🔢 동적 라우트 [id] + getStaticPaths</h2>

      <p className="text-sm leading-relaxed text-gray-300">
        <code>/user/:id</code> 한 라우트가 <b>useParams().id</b> 로 여러 URL 을
        처리해요(= Next 의 <code>[id]</code>). 빌드 때는 <b>id 1·2·3 만 미리 구웠어요</b>
        (= Next 의 <code>getStaticPaths</code>). 두 종류를 <b>직접 진입(새 탭)</b>으로
        비교해보세요.
      </p>

      <div className="grid w-full gap-4 text-left sm:grid-cols-2">
        {/* 미리 구운 id → 정적 파일 존재 */}
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <div className="mb-1 font-semibold text-emerald-300">미리 구운 id</div>
          <a
            href="/user/1"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-200 underline"
          >
            새 탭에서 /user/1 ↗
          </a>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            정적 <code>user/1.html</code> 존재 → <b>SSG·SSR 둘 다 정상</b>
          </p>
        </div>

        {/* 안 구운 id → 파일 없음 */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
          <div className="mb-1 font-semibold text-amber-300">안 구운 id</div>
          <a
            href="/user/999"
            target="_blank"
            rel="noreferrer"
            className="text-amber-200 underline"
          >
            새 탭에서 /user/999 ↗
          </a>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            파일 없음 → <b className="text-red-400">SSG 404</b> /{" "}
            <b className="text-emerald-300">SSR 즉석 렌더</b>
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        ※ 앱 안에서{" "}
        <Link to="/user/7" className="text-sky-300 underline">
          /user/7 링크 클릭(CSR)
        </Link>{" "}
        은 둘 다 보여요(서버에 안 물어봄). 차이는 "직접 진입"에서만 드러나요.
      </p>
    </div>
  );
};

export default DynamicParamDemo;
