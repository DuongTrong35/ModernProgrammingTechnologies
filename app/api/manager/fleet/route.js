import { NextResponse } from "next/server";
import { createManagerBus, getManagerData } from "@/services/manager.service";

export async function GET() {
  const data = await getManagerData();
  return NextResponse.json({ buses: data.buses });
}

export async function POST(request) {
  const result = await createManagerBus(await request.json());
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
  return NextResponse.json({ data: result.data }, { status: 201 });
}