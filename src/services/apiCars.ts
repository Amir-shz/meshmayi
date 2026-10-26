import "server-only";
import dbConnect from "@/lib/mongoose";
import Car from "@/models/carModel";
import { carTypes } from "@/types/types";
import { CarDetail } from "@/features/product/types/carDetail";

export async function getCars(limit = 0): Promise<carTypes[]> {
  await dbConnect();
  const cars = await Car.find().limit(limit).lean();
  return JSON.parse(JSON.stringify(cars));
}

export function getHomeCars() {
  return getCars(4);
}

export async function getCar(id: string): Promise<CarDetail | null> {
  if (!/^[a-f\d]{24}$/i.test(id)) return null;
  await dbConnect();
  const car = await Car.findById(id).lean();
  return car ? JSON.parse(JSON.stringify(car)) : null;
}
