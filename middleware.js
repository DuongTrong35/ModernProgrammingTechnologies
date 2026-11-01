import { NextResponse } from 'next/server';

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Lấy giá trị cookie phân quyền
  const authCookie = request.cookies.get('user_role')?.value;

  const isManagerPage = pathname.startsWith('/manager');
  const isManagerApi = pathname.startsWith('/api/manager');

  if (isManagerPage || isManagerApi) {
    // Nếu chưa đăng nhập hoặc không phải admin
    if (!authCookie || authCookie !== 'admin') {
      // 1. Nếu gọi API quản trị: Trả JSON 401 Unauthorized
      if (isManagerApi) {
        return NextResponse.json(
          {
            success: false,
            error: 'Unauthorized: Bạn cần quyền quản trị viên (admin).'
          },
          { status: 401 }
        );
      }

      // 2. Nếu truy cập Page quản trị trên trình duyệt: Redirect về login
      const loginUrl = new URL('/authenticator/login-user', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Cấu hình matcher để middleware chỉ can thiệp vào đúng các route cần bảo vệ
export const config = {
  matcher: [
    '/manager/:path*',
    '/api/manager/:path*',
  ],
};