"use client";

import Link from "next/link";
import { MOCK_NEWS } from "../../lib/new-route/news";
import { useState } from "react";
import Header from "../header";
import Footer from "../footer";
const CATEGORIES = [
  "Tất cả",
  "Thông báo",
  "Khuyến mãi",
  "Tuyển dụng",
  "Tuyến mới",
  "Cẩm nang",
];

export default function TinTucPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Lọc tin tức theo danh mục được chọn
  const filteredNews =
    selectedCategory === "Tất cả"
      ? MOCK_NEWS
      : MOCK_NEWS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0052cc]">
              Tin Tức & Sự Kiện
            </h1>
            <p className="text-gray-600 mt-2">
              Cập nhật những thông tin mới nhất từ Konoha Bus.
            </p>
          </div>

          {/* Thanh Danh mục */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0052cc] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Danh sách bài viết */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Link
                href={`/newdetail-route/${article.id}`}
                key={article.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
              >
                {/* Ảnh bìa */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full ${
                      article.category === "Tuyển dụng"
                        ? "bg-orange-500"
                        : article.category === "Khuyến mãi"
                        ? "bg-red-500"
                        : article.category === "Tuyến mới"
                        ? "bg-purple-500"
                        : "bg-[#0052cc]"
                    }`}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Nội dung */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                  <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#0052cc] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {article.summary}
                  </p>
                  <div className="text-[#0052cc] font-semibold text-sm flex items-center gap-1 mt-auto">
                    Đọc tiếp{" "}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
