import "server-only";
import dbConnect from "@/lib/mongoose";
import Car from "@/models/carModel";
import { carTypes } from "@/types/types";

export async function getCars(limit = 0): Promise<carTypes[]> {
  await dbConnect();
  const cars = await Car.find().limit(limit).lean();
  return JSON.parse(JSON.stringify(cars));
}

export function getHomeCars() {
  return getCars(4);
}
