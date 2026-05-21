import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    duration: { type: Number, required: true, min: 5 },
    image: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
