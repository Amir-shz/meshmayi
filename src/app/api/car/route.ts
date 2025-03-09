import dbConnect from "@/lib/mongoose";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const cars = await Car.find();

  return NextResponse.json({
    status: "success",
    length: cars.length,
    data: cars,
  });
}
