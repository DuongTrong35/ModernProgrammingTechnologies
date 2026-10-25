import { NextResponse } from "next/server";
import { deleteManagerRoute, updateManagerRoute } from "@/services/manager.service";

export async function PUT(request, { params }) {
  const { id } = await params;
  const result = await updateManagerRoute(id, await request.json());
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
  if (result.notFound) return NextResponse.json({ error: "Không tìm thấy tuyến đường." }, { status: 404 });
  return NextResponse.json({ data: result.data });
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const result = await deleteManagerRoute(id);
  if (result.notFound) return NextResponse.json({ error: "Không tìm thấy tuyến đường." }, { status: 404 });
  return NextResponse.json({ data: result });
}