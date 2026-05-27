import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// vite 가 빌드해 둔 HTML 껍데기. 이 안의 빈 #root 에 서버렌더 결과를 끼워넣는다.
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { SSRRender } = await import("./dist/server/entry-server.js");

// src/pages 의 .tsx 파일을 라우트로 변환한다. (App.tsx 의 규칙과 동일)
//   index.tsx  ->  "/"        ->  dist/static/index.html
//   about.tsx  ->  "/about"   ->  dist/static/about.html
const pagesDir = toAbsolute("src/pages");
const routes = fs
  .readdirSync(pagesDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => {
    const name = file.replace(/\.tsx$/, "").toLowerCase();
    return name === "index"
      ? { url: "/", out: "dist/static/index.html" }
      : { url: `/${name}`, out: `dist/static/${name}.html` };
  });

// [동적 라우트 [id] 의 정적 생성] 빌드 때 미리 구울 id 목록.
// = Next 의 getStaticPaths / generateStaticParams 가 반환하는 목록과 같은 역할.
// (App.tsx 의 <Route path="/user/:id"> · UserDemo 의 PRERENDERED_IDS 와 맞춰야 한다)
const STATIC_USER_IDS = ["1", "2", "3"];
for (const id of STATIC_USER_IDS) {
  routes.push({ url: `/user/${id}`, out: `dist/static/user/${id}.html` });
}

for (const { url, out } of routes) {
  // 1) 컴포넌트를 순수 HTML 문자열로 렌더 (이벤트/상태 없는 "마른 스펀지")
  const appHtml = SSRRender(url);

  // 2) index.html 의 <!--app-html--> 자리에 끼워넣는다.
  const html = template.replace("<!--app-html-->", appHtml);

  // 3) 정적 .html 파일로 저장 (중첩 경로면 폴더부터 만든다: dist/static/user/1.html)
  fs.mkdirSync(path.dirname(toAbsolute(out)), { recursive: true });
  fs.writeFileSync(toAbsolute(out), html);
  console.log(`prerendered ${url} -> ${out} (${appHtml.length} chars)`);
}
