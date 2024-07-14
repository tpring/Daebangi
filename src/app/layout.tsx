import LoadingAnimation from "@/components/commons/LoadingAnimation";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "대빵이",
  description: "빵의 도시 대전의 빵집 정보를 한 눈에 알아 볼 수 있는 웹사이트",
  keywords: ["빵집", "Bakery", "베이커리", "디저트", "react", "next.js", "프론트앤드개발자"],
  authors: [
    { name: "신자영" },
    { name: "김민곤" },
    { name: "천다연" },
    { name: "김택수" },
    { name: "윤희수" },
    { name: "이보아" },
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
