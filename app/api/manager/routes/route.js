import { NextResponse } from "next/server";
import { createManagerRoute, createManagerTrip, getManagerData, updateManagerTrip } from "@/services/manager.service";

export async function GET() {
  const data = await getManagerData();
  return NextResponse.json({ routes: data.routes, trips: data.trips });
}

export async function POST(request) {
  const input = await request.json();
  const result = input.kind === "trip"
    ? await createManagerTrip(input)
    : await createManagerRoute(input);
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
  if (result.notFound) return NextResponse.json({ error: "Không tìm thấy tuyến đường." }, { status: 404 });
  return NextResponse.json({ data: result.data }, { status: 201 });
}

export async function PUT(request) {
  const input = await request.json();
  if (input.kind !== "trip" || !input.id) {
    return NextResponse.json({ error: "Cần kind=trip và id chuyến." }, { status: 400 });
  }
  const result = await updateManagerTrip(input.id, input);
  if (result.errors) return NextResponse.json({ errors: result.errors }, { status: 400 });
  if (result.notFound) return NextResponse.json({ error: "Không tìm thấy chuyến xe." }, { status: 404 });
  return NextResponse.json({ data: result.data });
}