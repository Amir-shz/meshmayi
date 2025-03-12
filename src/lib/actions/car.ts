"use server";

import Car from "@/models/carModel";
import { digitsFaToEn, removeCommas } from "@persian-tools/persian-tools";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "../mongoose";

// EDIT CAR SERVER ACTION

export async function editCar(formdata: FormData) {
  const id = formdata.get("id");
  const name = formdata.get("name");
  const price = removeCommas(formdata.get("price") as string);
  const model = digitsFaToEn(formdata.get("model") as string);
  const colors = formdata.getAll("colors");
  const descriptions = formdata.getAll("description");
  const options = formdata.getAll("option");
  const labels = formdata.getAll("label");
  const picturesSrc = formdata.getAll("picturesSrc");

  const technicalSpecificationLabel = formdata.getAll(
    "technicalSpecificationLabel"
  ) as string[];
  const technicalSpecificationDescription = formdata.getAll(
    "technicalSpecificationDescription"
  ) as string[];

  const technicalSpecifications = technicalSpecificationLabel.map(
    (label: string, index: number) => ({
      label,
      description: technicalSpecificationDescription[index] || "",
    })
  );

  // ** task **  upload new pictures

  await dbConnect();

  await Car.findByIdAndUpdate(
    id,
    {
      name,
      model,
      price,
      colors,
      descriptions,
      labels,
      options,
      technicalSpecifications,
      pictures: picturesSrc.map((src) => ({ src })),
    },
    { new: true }
  );

  revalidatePath("/dashboard/cars");
  redirect("/dashboard/cars");
}

// CREATE CAR SERVER ACTION

export async function createCar(formdata: FormData) {
  const name = formdata.get("name");
  const price = removeCommas(formdata.get("price") as string);
  const model = digitsFaToEn(formdata.get("model") as string);
  const colors = formdata.getAll("colors");
  const descriptions = formdata.getAll("description");
  const options = formdata.getAll("option");
  const labels = formdata.getAll("label");
  // const picturesSrc = formdata.getAll("picturesSrc");

  const technicalSpecificationLabel = formdata.getAll(
    "technicalSpecificationLabel"
  ) as string[];
  const technicalSpecificationDescription = formdata.getAll(
    "technicalSpecificationDescription"
  ) as string[];

  const technicalSpecifications = technicalSpecificationLabel.map(
    (label: string, index: number) => ({
      label,
      description: technicalSpecificationDescription[index] || "",
    })
  );

  // ** task **  upload new pictures

  await dbConnect();

  await Car.create({
    name,
    model,
    price,
    colors,
    descriptions,
    labels,
    options,
    technicalSpecifications,
    // pictures: picturesSrc.map((src) => ({ src })),
  });

  // console.log(formdata);

  revalidatePath("/dashboard/cars");
  redirect("/dashboard/cars");
}

// DELETE CAR SERVER ACTION

export async function deleteCar(id: string) {
  await dbConnect();
  await Car.findByIdAndDelete(id);
  revalidatePath("/dashboard/cars");
}

// UPDATE CAR PICTURES SERVER ACTION

export async function updateCarPictures(formdata: FormData) {
  console.log(formdata);
}
