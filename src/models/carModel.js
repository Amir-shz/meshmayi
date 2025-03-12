import mongoose from "mongoose";

// const carSchema = new mongoose.Schema({
//   name: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
//   model: {
//     type: Number,
//   },
//   labels: [String],
//   colors: [String],
//   pictures: [{ src: { type: String } }],
//   descriptions: [String],
//   options: [String],
//   technicalSpecifications: [
//     {
//       label: { type: String },
//       description: { type: String },
//     },
//   ],
// });

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  labels: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  pictures: {
    type: [
      {
        src: { type: String, required: true },
      },
    ],
    required: true,
  },
  descriptions: {
    type: [String],
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  technicalSpecifications: {
    type: [
      {
        label: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    required: true,
  },
});

// export default mongoose.model("Car", carSchema);

const Car = mongoose.models?.Car || mongoose.model("Car", carSchema);

export default Car;
