import { NextResponse } from "next/server";
import { updateManagerBus } from "@/services/manager.service";

export async function PUT(request, { params }) {
  const { id } = await params;
  const result = await updateManagerBus(id, await request.json());
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
  if (result.notFound) return NextResponse.json({ error: "Không tìm thấy phương tiện." }, { status: 404 });
  return NextResponse.json({ data: result.data });
}