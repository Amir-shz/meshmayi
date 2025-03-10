import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  model: {
    type: Number,
  },
  colors: String,
  pictures: [{ src: { type: String } }],
  descriptions: [String],
  options: [String],
  technicalSpecifications: [
    {
      label: { type: String },
      description: { type: String },
    },
  ],
});

const Car = mongoose.models?.Car || mongoose.model("Car", carSchema);

export default Car;
