import { Route, Routes } from "react-router-dom";
import DynamicRouteDemo from "./components/DynamicRouteDemo";
import UserDemo from "./components/UserDemo";

const PagePathsWithComponents: Record<string, { default: any }> =
  import.meta.glob(["./pages/**/*.tsx"], {
    eager: true,
  });

const routes = Object.keys(PagePathsWithComponents).map((path: string) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1];

  return {
    name,
    path: name === "index" ? "/" : `/${name.toLowerCase()}`,
    component: PagePathsWithComponents[path]?.default,
  };
});

function App() {
  return (
    <>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />} />;
        })}
        {/* 동적 라우트 [id]: 한 라우트가 useParams().id 로 여러 URL 을 처리.
            빌드 때 prerender.js 가 일부 id(1·2·3)만 미리 굽는다(= getStaticPaths). */}
        <Route path="/user/:id" element={<UserDemo />} />
        {/* src/pages 에 파일이 없는(=prerender 안 된) 모든 경로를 받는다(catch-all, [...slug]).
            SSR 은 이걸 즉석 렌더(200), SSG 는 해당 .html 이 없어 404 가 된다. */}
        <Route path="*" element={<DynamicRouteDemo />} />
      </Routes>
    </>
  );
}

export default App;
