import { NextResponse } from "next/server";

import {
  updateManagerBus
} from "../../../../../services/manager.service";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const input = await request.json();

    const result = await updateManagerBus(id, input);

    if (result.errors) {
      return NextResponse.json(
        { errors: result.errors },
        { status: 400 }
      );
    }

    if (result.notFound) {
      return NextResponse.json(
        { error: "Không tìm thấy phương tiện." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: result.data
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể cập nhật phương tiện." },
      { status: 500 }
    );
  }
}