"use server";

import Car from "@/models/carModel";
import { digitsFaToEn, removeCommas } from "@persian-tools/persian-tools";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "../mongoose";
import { S3 } from "aws-sdk";

const accessKeyId = process.env.LIARA_ACCESS_KEY as string;
const secretAccessKey = process.env.LIARA_SECRET_KEY as string;
const endpoint = process.env.LIARA_ENDPOINT as string;
const bucket = process.env.LIARA_BUCKET_NAME as string;

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
});

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
  // const picturesSrc = formdata.getAll("picturesSrc");
  const picturesFiles = formdata.getAll("picturesFiles");
  const picturesSrc = formdata.getAll("picturesSrc") as Array<string>;

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

  const picLinks = [...picturesSrc];

  if (picturesFiles) {
    for (const file of picturesFiles) {
      const myFile = file as File;

      const buffer = Buffer.from(await myFile.arrayBuffer());
      const location = await uploadFileToS3(buffer, myFile.name);
      if (location) picLinks.push(location);
    }
  }

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
      pictures: picLinks.map((src) => ({ src })),
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
  const picturesFiles = formdata.getAll("picturesFiles");
  const picturesSrc = formdata.getAll("picturesSrc") as Array<string>;

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

  const picLinks = [...picturesSrc];

  if (picturesFiles) {
    for (const file of picturesFiles) {
      const myFile = file as File;

      const buffer = Buffer.from(await myFile.arrayBuffer());
      const location = await uploadFileToS3(buffer, myFile.name);
      if (location) picLinks.push(location);
    }
  }

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
    pictures: picLinks.map((src) => ({ src })),
  });

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

// export async function updateCarPictures(formdata: FormData) {
//   const picturesFiles = formdata.getAll("picturesFiles");
//   const picturesSrc = formdata.getAll("picturesSrc") as Array<string>;

//   console.log(formdata);

//   const picLinks = [...picturesSrc];

//   if (picturesFiles) {
//     await dbConnect();
//     picturesFiles.map(async (file) => {
//       const myFile = file as File;

//       const buffer = Buffer.from(await myFile.arrayBuffer());
//       const location = await uploadFileToS3(buffer, myFile.name);
//       if (location) picLinks.push(location);
//     });
//   }
// }

async function uploadFileToS3(file: Buffer<ArrayBufferLike>, fileName: string) {
  const fileBuffer = file;

  const params = {
    Bucket: bucket,
    Key: `${fileName}${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };

  try {
    const response = await s3.upload(params).promise();

    return response.Location;
  } catch (error) {
    console.log(error);
  }
}
