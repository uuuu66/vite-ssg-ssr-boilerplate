import { PropsWithChildren, forwardRef } from "react";
import DynamicParamDemo from "../components/DynamicParamDemo";
import HydrationDemo from "../components/HydrationDemo";
import RouteDemoNav from "../components/RouteDemoNav";
import RoutingModeDemo from "../components/RoutingModeDemo";
import SsgSsrDemo from "../components/SsgSsrDemo";

// 사이트 첫 진입 화면 = 렌더링 개념 통합 데모 허브.
// 위에서 아래로 "한 페이지가 살아나는 순서" 를 따라간다:
//   ① 첫 진입(서버가 준 HTML) + 하이드레이션          → HydrationDemo
//   ② SSG vs SSR (서버 렌더 시각 고정/갱신)             → SsgSsrDemo
//   ③ SSG/SSR 라우팅 — catch-all [...slug]              → RoutingModeDemo
//   ④ 동적 라우트 [id] + getStaticPaths (일부만 미리 굽기) → DynamicParamDemo
// 그리고 RouteDemoNav 가 "지금 풀 로드냐 / JS 라우팅이냐" 를 상단에 항상 표시한다.

const Divider = ({ label }: { label: string }) => (
  <div className="flex w-full max-w-3xl items-center gap-4 text-gray-600">
    <span className="h-px flex-1 bg-gray-700" />
    <span className="whitespace-nowrap text-xs uppercase tracking-widest">
      {label}
    </span>
    <span className="h-px flex-1 bg-gray-700" />
  </div>
);

const HomeSection = forwardRef<HTMLDivElement, PropsWithChildren>((_, ref) => {
  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-center gap-16 bg-black py-24 text-white"
    >
      <RouteDemoNav />

      <Divider label="① 첫 진입 + 하이드레이션" />
      <HydrationDemo />

      <Divider label="② SSG vs SSR — 서버 렌더 시각" />
      <SsgSsrDemo />

      <Divider label="③ SSG/SSR 라우팅 — catch-all [...slug]" />
      <RoutingModeDemo />

      <Divider label="④ 동적 라우트 [id] + getStaticPaths" />
      <DynamicParamDemo />
    </div>
  );
});

export default HomeSection;
