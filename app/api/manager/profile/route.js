import { NextResponse } from "next/server";
import { getManagerData, updateManagerProfile } from "@/services/manager.service";

export async function GET() {
  const { operator } = await getManagerData();
  return NextResponse.json({ data: operator });
}

export async function PUT(request) {
  const result = await updateManagerProfile(await request.json());
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
  return NextResponse.json({ data: result.data });
}