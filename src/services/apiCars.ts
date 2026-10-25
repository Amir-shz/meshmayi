import "server-only";
import dbConnect from "@/lib/mongoose";
import Car from "@/models/carModel";
import { carTypes } from "@/types/types";

export async function getHomeCars(): Promise<carTypes[]> {
  await dbConnect();
  const cars = await Car.find().limit(6).lean();
  return JSON.parse(JSON.stringify(cars));
}
