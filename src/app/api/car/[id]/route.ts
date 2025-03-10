import dbConnect from "@/lib/mongoose";
import Car from "@/models/carModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await dbConnect();

  const car = await Car.findById(id);

  return NextResponse.json({
    status: "success",
    data: car,
  });
}
