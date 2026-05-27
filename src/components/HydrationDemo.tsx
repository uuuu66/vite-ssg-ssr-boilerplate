import { useEffect, useState } from "react";

/**
 * 하이드레이션을 "눈으로 보여주기" 위한 데모 컴포넌트.
 *
 * - 서버(renderToString)는 이 컴포넌트를 HTML 문자열로만 그린다.
 *   이벤트 핸들러도, 상태 변경도 붙지 않은 "마른 스펀지" 상태.
 * - 브라우저에서 entry-client 의 hydrateRoot 가 실행되어야 비로소
 *   onClick / useState 가 살아난다(= 하이드레이션 = 스펀지에 물 붓기).
 */
const HydrationDemo: React.FC = () => {
  // 서버 렌더 시점엔 항상 false 이므로, 서버가 보내는 HTML 에는 "전" 상태가 박힌다.
  const [hydrated, setHydrated] = useState(false);
  const [count, setCount] = useState(0);

  // useEffect 는 브라우저에서 하이드레이션이 끝난 "뒤"에만 실행된다.
  // 즉, 이 한 줄이 도는 순간이 곧 하이드레이션이 완료된 시점이다.
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 text-center px-6">
      <h1 className="text-4xl font-bold">💧 하이드레이션 데모</h1>

      {/* 상태 배지: 서버 HTML 엔 빨강("전"), JS 로드 후 초록("완료")으로 바뀐다. */}
      <div
        className={`px-5 py-2 rounded-full text-lg font-semibold transition-colors ${
          hydrated ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {hydrated
          ? "✅ 하이드레이션 완료 — 이제 버튼이 살아 있습니다"
          : "🚫 하이드레이션 전 — 화면은 보이지만 버튼은 죽어 있어요"}
      </div>

      <div className="text-7xl font-mono tabular-nums">{count}</div>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="py-4 px-8 rounded-xl bg-blue-600 text-xl hover:bg-blue-500 active:scale-95 transition"
      >
        +1 눌러보기
      </button>

      <p className="max-w-md text-sm text-gray-400 leading-relaxed">
        이 HTML 은 서버에서 미리 그려져 <b>즉시</b> 보입니다(마른 스펀지). 하지만{" "}
        <code className="text-gray-200">hydrateRoot</code> 가 실행되기 전엔 위 버튼을
        아무리 눌러도 숫자가 오르지 않아요. JS 번들이 로드되고 하이드레이션이 끝나면
        배지가 초록으로 바뀌고 버튼이 살아납니다.
      </p>
    </div>
  );
};

export default HydrationDemo;
