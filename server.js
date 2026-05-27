import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

export async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p);

  app.use((await import("compression")).default());

  // 빌드된 클라이언트 정적 파일(JS/CSS/이미지)을 서빙한다.
  // index: false -> "/" 요청 때 index.html 을 자동 응답하지 않고 아래 핸들러로 흘려보낸다.
  app.use(express.static(resolve("dist/client"), { index: false }));

  const { SSRRender } = await import("./dist/server/entry-server.js");

  app.use("*", (req, res) => {
    const url = req.originalUrl; // 요청 경로를 그대로 사용 (하드코딩하지 않는다)

    const template = fs.readFileSync(resolve("dist/client/index.html"), "utf-8");

    // 1) 서버에서 컴포넌트를 HTML 문자열로 렌더 ("마른 스펀지" — 이벤트/상태 없음)
    const appHtml = SSRRender(url);

    // 2) index.html 의 <!--app-html--> 자리에 끼워넣는다.
    const html = template.replace("<!--app-html-->", appHtml);

    // 3) 완성된 HTML 응답. 브라우저는 이 HTML 로 즉시 화면을 그리고,
    //    이후 entry-client 의 hydrateRoot 가 이 DOM 에 이벤트/상태를 입힌다(= 하이드레이션).
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  return { app };
}

createServer().then(({ app }) =>
  app.listen(3033, () => {
    console.log("react vite ssr server: http://localhost:3033");
  })
);
