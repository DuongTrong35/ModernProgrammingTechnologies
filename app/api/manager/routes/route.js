import { NextResponse } from "next/server";
import {
  createManagerRoute,
  createManagerTrip,
  getManagerData,
  updateManagerTrip,
} from "../../../../services/manager.service";

export async function GET() {
  try {
    const data = await getManagerData();
    return NextResponse.json({ routes: data.routes, trips: data.trips });
  } catch (error) {
    console.error("GET /api/manager/routes:", error);
    return NextResponse.json(
      { error: "Không thể tải dữ liệu tuyến đường." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const input = await request.json();

    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return NextResponse.json(
        { error: "Dữ liệu gửi lên không hợp lệ." },
        { status: 400 }
      );
    }

    if (input.kind && !["route", "trip"].includes(input.kind)) {
      return NextResponse.json(
        { error: "Loại dữ liệu không hợp lệ. Chỉ chấp nhận 'route' hoặc 'trip'." },
        { status: 400 }
      );
    }

    const result =
      input.kind === "trip"
        ? await createManagerTrip(input)
        : await createManagerRoute(input);

    if (result.errors) {
      const statusCode = result.status || 400;
      return NextResponse.json({ errors: result.errors }, { status: statusCode });
    }

    if (result.notFound) {
      return NextResponse.json(
        { error: "Không tìm thấy dữ liệu liên quan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/manager/routes:", error);
    return NextResponse.json(
      { error: "Không thể xử lý yêu cầu." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const input = await request.json();

    // 1. Kiểm tra format input cơ bản (400)
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return NextResponse.json(
        { error: "Dữ liệu gửi lên không đúng định dạng JSON." },
        { status: 400 }
      );
    }

    if (input.kind !== "trip" || !input.id) {
      return NextResponse.json(
        { error: "Yêu cầu phải có trường kind='trip' và id chuyến xe." },
        { status: 400 }
      );
    }

    // Gọi service xử lý nghiệp vụ
    const result = await updateManagerTrip(input.id, input);

    // 2. Kiểm tra không tìm thấy (404)
    if (result.notFound) {
      return NextResponse.json(
        { error: `Không tìm thấy chuyến xe có mã '${input.id}'.` },
        { status: 404 }
      );
    }

    // 3. Kiểm tra vi phạm nghiệp vụ / chuyển trạng thái không hợp lệ (422) hoặc thiếu trường (400)
    if (result.errors) {
      const statusCode = result.status || (result.isInvalidTransition ? 422 : 400);
      return NextResponse.json(
        {
          errors: result.errors,
          code: result.errorCode || (statusCode === 422 ? "INVALID_TRANSITION" : "VALIDATION_FAILED")
        },
        { status: statusCode }
      );
    }

    // 4. Thành công (200) kèm trace đối chiếu trạng thái trước - sau
    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái chuyến xe thành công.",
      trace: result.trace || {
        tripId: input.id,
        updatedStatus: result.data?.status,
        timestamp: new Date().toISOString()
      },
      data: result.data
    }, { status: 200 });

  } catch (error) {
    console.error("PUT /api/manager/routes:", error);
    return NextResponse.json(
      { error: "Không thể xử lý yêu cầu do lỗi máy chủ." },
      { status: 500 }
    );
  }
}