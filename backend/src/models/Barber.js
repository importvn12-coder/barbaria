import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
    availableTimes: [{ type: String, required: true }],
    bio: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Barber = mongoose.model("Barber", barberSchema);
