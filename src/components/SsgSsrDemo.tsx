import { useEffect, useState } from "react";

/**
 * SSG vs SSR 를 "눈으로 보여주기" 위한 데모 컴포넌트.
 *
 * 이 프로젝트에서 SSG 와 SSR 는 렌더링 코드(SSRRender)가 완전히 똑같다.
 * 차이는 오직 "SSRRender 가 언제 도느냐" 하나뿐이다.
 *   - SSG (npm run ssg): 빌드 타임에 1번 → prerender.js → .html 파일로 박제
 *   - SSR (npm run ssr): 요청 타임에 매번 → server.js → 메모리에서 즉석 렌더
 *
 * 그래서 "서버가 렌더한 시각"을 화면에 박아두면 둘이 다르게 동작한다:
 *   - SSG → 빌드한 그 순간으로 고정. 새로고침(F5)해도 시각이 안 변함.
 *   - SSR → 요청마다 다시 렌더. 새로고침할 때마다 시각이 갱신됨.
 */

// 렌더가 도는 "그 순간"의 시각을 사람이 읽기 좋은 문자열로.
function formatNow(): string {
  return new Date().toLocaleString("ko-KR", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// 서버가 박아둔 시각을 클라이언트가 그대로 읽어오기 위한 DOM id.
const SERVER_TIME_ID = "ssg-ssr-server-time";

const SsgSsrDemo: React.FC = () => {
  // [핵심] 서버가 SSRRender() 를 실행하는 "그 순간"의 시각.
  // - 서버(renderToString): document 가 없으므로 formatNow() 가 실행돼
  //   "서버 렌더 시각"이 HTML 에 그대로 박힌다.
  // - 브라우저(hydrate): 서버가 이미 박아둔 값을 DOM 에서 다시 읽어 state 초기값으로 쓴다.
  //   → 클라이언트가 새 시각으로 "덮어쓰지" 않으므로 서버가 그린 시각이 보존되고,
  //     서버 HTML 과 클라이언트 렌더 결과가 같아 하이드레이션 mismatch 도 안 난다.
  const [serverRenderedAt] = useState<string>(() => {
    if (typeof document !== "undefined") {
      const fromDom = document.getElementById(SERVER_TIME_ID)?.textContent;
      if (fromDom) return fromDom;
    }
    return formatNow();
  });

  // [대조군] 브라우저에서 1초마다 갱신되는 "지금 시각".
  // useEffect 는 하이드레이션이 끝나야 돌기 때문에, 이 시계가 흐르기 시작하는 순간이
  // 곧 "JS 가 붙어 페이지가 살아난" 시점이다.
  const [clientNow, setClientNow] = useState<string | null>(null);
  useEffect(() => {
    setClientNow(formatNow());
    const id = setInterval(() => setClientNow(formatNow()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 text-center px-6 py-16">
      <h1 className="text-4xl font-bold">🏗️ SSG vs SSR 데모</h1>

      <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
        {/* 서버 렌더 시각: SSG 면 고정, SSR 면 새로고침마다 변함 */}
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-6 py-8">
          <span className="text-sm font-semibold uppercase tracking-wide text-amber-400">
            🖥️ 서버가 렌더한 시각
          </span>
          <span
            id={SERVER_TIME_ID}
            // 혹시 모를 mismatch 경고를 막아 서버가 박은 값을 그대로 유지한다.
            suppressHydrationWarning
            className="font-mono text-xl tabular-nums text-amber-200"
          >
            {serverRenderedAt}
          </span>
          <span className="text-xs leading-relaxed text-gray-400">
            HTML 에 박혀서 온 값. <b>새로고침(F5)</b> 해보세요.
          </span>
        </div>

        {/* 클라이언트 현재 시각: 하이드레이션 후 매초 갱신 (SSG/SSR 동일) */}
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-sky-500/40 bg-sky-500/10 px-6 py-8">
          <span className="text-sm font-semibold uppercase tracking-wide text-sky-400">
            🌐 브라우저 현재 시각
          </span>
          <span className="font-mono text-xl tabular-nums text-sky-200">
            {clientNow ?? "⏳ 하이드레이션 대기 중…"}
          </span>
          <span className="text-xs leading-relaxed text-gray-400">
            JS 가 붙은 뒤 매초 흐름. 둘 다(SSG·SSR) 똑같이 동작.
          </span>
        </div>
      </div>

      <div className="max-w-2xl space-y-3 text-left text-sm leading-relaxed text-gray-300">
        <p>
          <b className="text-amber-300">서버 렌더 시각</b>을 보고 <b>F5 로 여러 번
          새로고침</b> 해보세요:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            시각이 <b>안 바뀌면</b> →{" "}
            <code className="text-amber-200">npm run ssg</code> (빌드 때 박제된 정적
            HTML 을 보고 있는 것)
          </li>
          <li>
            새로고침마다 <b>시각이 갱신되면</b> →{" "}
            <code className="text-sky-200">npm run ssr</code> (요청마다 서버가 다시
            렌더)
          </li>
        </ul>
        <p className="text-xs text-gray-500">
          ⚠️ 페이지 안에서 라우터로 이동(클릭)하면 서버 재요청이 아니므로 변화가
          안 보입니다. 반드시 <b>브라우저 새로고침</b>으로 확인하세요. (페이지 소스
          보기 <code>view-source:</code> 로 보면 두 경우 모두 #root 가 이미 채워져
          있어, CSR 과 달리 둘 다 서버에서 HTML 을 그렸음을 함께 볼 수 있어요.)
        </p>
      </div>
    </div>
  );
};

export default SsgSsrDemo;
