import dbConnect from "@/lib/mongoose";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const cars = await Car.find().limit(6);

  return NextResponse.json({
    status: "success",
    data: cars,
  });
}
