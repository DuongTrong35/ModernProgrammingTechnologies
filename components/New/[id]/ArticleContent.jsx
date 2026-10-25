"use client";
import { MOCK_NEWS } from "../../../lib/new-route/news";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ArticleContent() {
  const params = useParams();
  const article = MOCK_NEWS.find((n) => n.id === params.id);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy bài viết!
          </h1>
          <Link href="/new-route" className="text-[#0052cc] hover:underline">
            Quay lại trang Tin tức
          </Link>
        </div>
      </div>
    );
  }

  const relatedNews = MOCK_NEWS.filter((n) => n.id !== article.id).slice(0, 3);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (text) => {
    const sections = text.split(/(\[.*?\])/g);

    return sections.map((section, index) => {
      // 1. XỬ LÝ TIÊU ĐỀ MỤC LỚN (Nằm trong ngoặc vuông)
      if (section.startsWith("[") && section.endsWith("]")) {
        const title = section.replace(/[\[\]]/g, "");

        let icon = null;
        let colorClass = "text-blue-600";
        let bgClass = "bg-blue-50";

        if (title.includes("MÔ TẢ")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          );
          colorClass = "text-blue-600";
          bgClass = "bg-blue-50";
        } else if (title.includes("YÊU CẦU")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
          colorClass = "text-orange-600";
          bgClass = "bg-orange-50";
        } else if (title.includes("QUYỀN LỢI") || title.includes("ƯU ĐÃI")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
          colorClass = "text-green-600";
          bgClass = "bg-green-50";
        } else if (title.includes("LIÊN HỆ") || title.includes("THÔNG TIN")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          );
          colorClass = "text-purple-600";
          bgClass = "bg-purple-50";
        } else if (title.includes("THỜI GIAN") || title.includes("LỊCH")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
          colorClass = "text-teal-600";
          bgClass = "bg-teal-50";
        } else if (title.includes("CÁCH THỨC") || title.includes("BƯỚC")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          );
          colorClass = "text-yellow-600";
          bgClass = "bg-yellow-50";
        } else if (title.includes("ĐIỀU KHOẢN") || title.includes("LƯU Ý")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          );
          colorClass = "text-gray-700";
          bgClass = "bg-gray-100";
        } else if (title.includes("CHI PHÍ") || title.includes("GIÁ")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          );
          colorClass = "text-pink-600";
          bgClass = "bg-pink-50";
        } else if (title.includes("THỜI ĐIỂM")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          );
          colorClass = "text-indigo-600";
          bgClass = "bg-indigo-50";
        } else if (title.includes("PHƯƠNG TIỆN")) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          );
          colorClass = "text-cyan-600";
          bgClass = "bg-cyan-50";
        } else if (
          title.includes("ĐỊA ĐIỂM") ||
          title.includes("TOP") ||
          title.match(/^\d+\./)
        ) {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          );
          colorClass = "text-red-600";
          bgClass = "bg-red-50";
        }

        // === SỬA LỖI ICON CHO BÀI CAM KẾT VÀ CÁC BÀI KHÁC ===
        else if (
          title.includes("CAM KẾT") ||
          title.includes("CHẤT LƯỢNG") ||
          title.includes("ĐỘI NGŨ") ||
          title.includes("SỰ HÀI LÒNG") ||
          title.includes("QUY TRÌNH") ||
          title.includes("DÀN XE")
        ) {
          if (title.includes("ĐỘI NGŨ"))
            icon = (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            );
          else if (title.includes("DÀN XE"))
            icon = (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            );
          else if (title.includes("QUY TRÌNH"))
            icon = (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            );
          else
            icon = (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            );
          colorClass = "text-emerald-600";
          bgClass = "bg-emerald-50";
        }

        // Icon mặc định (Dấu gạch ngang)
        else {
          icon = (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          );
          colorClass = "text-gray-500";
          bgClass = "bg-gray-50";
        }

        return (
          <div key={index} className="mt-10 mb-4 animate-fade-in-up">
            <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <div className={`p-2 rounded-lg ${bgClass} ${colorClass}`}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                {title}
              </h3>
            </div>
          </div>
        );
      }

      // 2. XỬ LÝ NỘI DUNG BÊN DƯỚI MỤC
      const lines = section.split("\n").filter((line) => line.trim() !== "");
      if (lines.length === 0) return null;

      // Xử lý riêng cho từng dòng để nhận diện số thứ tự và gạch đầu dòng
      return (
        <div key={index} className="mb-8 animate-fade-in space-y-2">
          {lines.map((line, i) => {
            const trimmed = line.trim();

            // TRƯỜNG HỢP 1: Dòng bắt đầu bằng số thứ tự (VD: 1. CHỢ NỔI...) hoặc "Bước X:"
            if (trimmed.match(/^\d+\./) || trimmed.startsWith("Bước")) {
              return (
                <h4
                  key={i}
                  className="text-lg font-bold text-gray-800 mt-6 mb-2 flex items-center gap-2"
                >
                  <span className="w-1.5 h-6 bg-[#0052cc] rounded-full inline-block"></span>
                  {trimmed}
                </h4>
              );
            }

            // TRƯỜNG HỢP 2: Dòng bắt đầu bằng dấu gạch ngang (VD: - Nét văn hóa...)
            if (trimmed.startsWith("-")) {
              return (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed pl-6 text-[17px]"
                >
                  {trimmed.substring(1).trim()}{" "}
                  {/* Xóa dấu gạch ngang đầu dòng */}
                </p>
              );
            }

            // TRƯỜNG HỢP 3: Văn bản bình thường
            return (
              <p
                key={i}
                className="text-gray-700 leading-relaxed text-[17px] pl-6"
              >
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Ảnh bìa */}
        <div className="w-full h-[400px] relative overflow-hidden group">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-8">
            <span className="bg-[#0052cc] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {article.date}
            </span>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Tóm tắt */}
          <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#0052cc] p-5 rounded-r-xl mb-10 shadow-sm">
            <p className="text-lg font-medium text-gray-800 italic leading-relaxed">
              "{article.summary}"
            </p>
          </div>

          {/* Nội dung chính */}
          <div className="prose max-w-none">
            {renderContent(article.content)}
          </div>

          {/* Thanh Chia sẻ mạng xã hội */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 font-medium">Chia sẻ bài viết này:</p>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                    "_blank"
                  );
                }}
                className="p-2.5 bg-[#1877F2] text-white rounded-full hover:scale-110 transition-transform shadow-md"
                title="Chia sẻ Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Zalo */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://zalo.me/share?u=${url}`, "_blank");
                }}
                className="p-2.5 bg-[#0068FF] text-white rounded-full hover:scale-110 transition-transform shadow-md flex items-center justify-center"
                title="Chia sẻ Zalo"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm3.5 14.5h-2.5v-2h2.5v2zm-3.5 0h-2v-2h2v2zm-3.5 0H6v-2h2.5v2z" />
                  <text
                    x="50%"
                    y="54%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                  >
                    Zalo
                  </text>
                </svg>
              </button>

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className={`p-2.5 rounded-full shadow-md transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Sao chép liên kết"
              >
                {copied ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bài viết liên quan */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#0052cc] pl-3">
          Có thể bạn quan tâm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <Link  href={`/newdetail-route/${news.id}`} key={news.id} className="group">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 h-full flex flex-col">
                <div className="h-32 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1">
                  <p className="text-xs text-[#0052cc] font-semibold mb-2">
                    {news.category}
                  </p>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-[#0052cc] transition-colors">
                    {news.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Nút quay lại */}
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <Link
          href="/new-route"
          className="inline-flex items-center gap-2 text-gray-600 font-semibold hover:text-[#0052cc] transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại danh sách tin tức
        </Link>
      </div>
    </div>
  );
}
