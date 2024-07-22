import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="kr">
        <Head></Head>
        <body>
          <Main /> {/* 페이지의 주요 콘텐츠가 여기에 렌더링됩니다 */}
          <NextScript /> {/* Next.js의 스크립트가 여기에 삽입됩니다 */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
