import { NextResponse } from "next/server";

import {
  createManagerBus,
  getManagerData
} from "../../../../services/manager.service";

export async function GET() {
  try {
    const data = await getManagerData();

    return NextResponse.json({
      buses: data.buses
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể lấy danh sách xe." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const input = await request.json();

    const result = await createManagerBus(input);

    if (result.errors) {
      return NextResponse.json(
        { errors: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { data: result.data },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể tạo phương tiện." },
      { status: 500 }
    );
  }
}