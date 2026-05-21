import express from "express";
import { Appointment } from "../models/Appointment.js";
import { Service } from "../models/Service.js";
import { Barber } from "../models/Barber.js";
import { requireAuth } from "../middleware/auth.js";

export const appointmentsRouter = express.Router();

appointmentsRouter.get("/appointments", requireAuth, async (_req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("service", "name price duration")
      .populate("barber", "name specialty")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

appointmentsRouter.post("/appointments", async (req, res, next) => {
  try {
    const { service: serviceId, barber: barberId, date, time, customerName, customerPhone } = req.body;
    const service = await Service.findById(serviceId);
    const barber = await Barber.findById(barberId);

    if (!service || !barber) {
      return res.status(400).json({ error: "Serviço ou barbeiro inválido." });
    }

    if (!barber.availableTimes.includes(time)) {
      return res.status(400).json({ error: "Horário indisponível para este barbeiro." });
    }

    const whatsappMessage = `Olá, meu nome é ${customerName}. Gostaria de confirmar meu horário para ${service.name} às ${time} no dia ${date}.`;

    const appointment = await Appointment.create({
      service: serviceId,
      barber: barberId,
      date,
      time,
      customerName: customerName?.trim(),
      customerPhone: customerPhone?.trim(),
      whatsappMessage
    });

    await appointment.populate("service barber");
    res.status(201).json(appointment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Este horário já foi reservado." });
    }
    next(error);
  }
});

appointmentsRouter.delete("/appointments/:id", requireAuth, async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Agendamento não encontrado." });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
