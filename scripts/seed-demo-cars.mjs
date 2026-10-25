import mongoose from "mongoose";
import nextEnv from "@next/env";
import Car from "../src/models/carModel.js";

nextEnv.loadEnvConfig(process.cwd());
const uri = process.env.DATABASE ?? "";
if (
  !/^mongodb:\/\/(?:127\.0\.0\.1|localhost|\[::1\]):27017\/meshmayi(?:\?.*)?$/.test(
    uri,
  )
) {
  throw new Error(
    "Demo seed only supports the local meshmayi database on port 27017.",
  );
}

const samples = [
  ["مرسدس بنز سفید", 2024, 28000, "/images/hero-mercedes.jpg", "white", "سدان"],
  ["بی‌ام‌و مشکی", 2023, 32000, "/images/demo/bmw.jpg", "black", "سدان"],
  ["آئودی سفید", 2024, 30000, "/images/demo/audi.jpg", "white", "شهری"],
  [
    "شاسی‌بلند خانوادگی",
    2025,
    35000,
    "/images/demo/suv.jpg",
    "gray",
    "شاسی‌بلند",
  ],
  ["خودروی اسپرت", 2023, 45000, "/images/demo/sports-car.jpg", "black", "اسپرت"],
  ["بی‌ام‌و آبی", 2024, 29000, "/images/demo/bmw-blue.jpg", "blue", "سدان"],
  [
    "مرسدس بنز شهری",
    2025,
    34000,
    "/images/consultation-mercedes.jpg",
    "silver",
    "شهری",
  ],
  ["آئودی خانوادگی", 2025, 33000, "/images/demo/audi.jpg", "white", "خانوادگی"],
];

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  for (const [
    index,
    [name, model, price, picture, color, category],
  ] of samples.entries()) {
    const _id = new mongoose.Types.ObjectId(
      "6f000000000000000000000" + (index + 1),
    );
    const sample = {
      name: name + " (نمونه)",
      model,
      price,
      labels: ["نمونه آزمایشی", category],
      colors: [color, color === "white" ? "black" : "white"],
      pictures: [{ src: picture }],
      descriptions: [
        "این خودرو صرفاً دادهٔ آزمایشی برای بررسی طراحی سایت است و موجودی واقعی نیست.",
        "قیمت، سال مدل، امکانات و مشخصات این نمونه فرضی هستند و پیشنهاد فروش محسوب نمی‌شوند.",
      ],
      options: [
        "گیربکس اتوماتیک",
        "دوربین عقب",
        "کروز کنترل",
        "نمایشگر لمسی",
        "سنسور پارک",
        "تهویه اتوماتیک",
      ].slice(0, 3 + (index % 4)),
      technicalSpecifications: [
        { label: "نوع بدنه", description: category + " (آزمایشی)" },
        { label: "نوع سوخت", description: "بنزینی (فرضی)" },
        { label: "گیربکس", description: "اتوماتیک (فرضی)" },
        { label: "تعداد صندلی", description: "5 نفر (فرضی)" },
        { label: "حجم موتور", description: "2000 سی‌سی (فرضی)" },
        { label: "وضعیت", description: "نمونه نمایشی" },
      ],
    };
    // Insert only: reruns preserve any edits made to existing sample records.
    await Car.updateOne(
      { _id },
      { $setOnInsert: sample },
      { upsert: true, runValidators: true },
    );
  }
  const count = await Car.countDocuments({
    _id: {
      $in: samples.map(
        (_, index) =>
          new mongoose.Types.ObjectId("6f000000000000000000000" + (index + 1)),
      ),
    },
  });
  console.log(
    `Local demo cars ready: ${count}. Existing records were preserved.`,
  );
} finally {
  await mongoose.disconnect();
}
