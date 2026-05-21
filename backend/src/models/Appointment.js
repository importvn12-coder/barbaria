import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    barber: { type: mongoose.Schema.Types.ObjectId, ref: "Barber", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    status: { type: String, enum: ["confirmado", "cancelado"], default: "confirmado" },
    whatsappMessage: { type: String, required: true }
  },
  { timestamps: true }
);

appointmentSchema.index({ barber: 1, date: 1, time: 1 }, { unique: true });

export const Appointment = mongoose.model("Appointment", appointmentSchema);
