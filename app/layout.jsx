import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
export const metadata = {
    title: "TAYDO Bus Lines | Đặt vé xe khách",
    description: "Tìm chuyến xe, chọn hành trình và quản lý nhà xe TAYDO Bus Lines.",
};
export default function RootLayout({ children }) {
    return (<html lang="vi"  data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>);
}
