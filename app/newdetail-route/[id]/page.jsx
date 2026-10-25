import { Suspense } from "react";
import ArticleContent from "../../../components/New/[id]/ArticleContent";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
export default function page() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0052cc] mx-auto mb-4"></div>
              <p className="text-gray-500">Đang tải bài viết...</p>
            </div>
          </div>
        }
      >
        <ArticleContent />
      </Suspense>
      <Footer />
    </>
  );
}
