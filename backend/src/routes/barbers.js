import express from "express";
import { Barber } from "../models/Barber.js";
import { requireAuth } from "../middleware/auth.js";

export const barbersRouter = express.Router();

barbersRouter.get("/barbers", async (_req, res, next) => {
  try {
    res.json(await Barber.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

barbersRouter.post("/barbers", requireAuth, async (req, res, next) => {
  try {
    const barber = await Barber.create({
      name: req.body.name?.trim(),
      specialty: req.body.specialty?.trim(),
      photo: req.body.photo?.trim(),
      bio: req.body.bio?.trim() || "",
      availableTimes: Array.isArray(req.body.availableTimes) ? req.body.availableTimes : []
    });
    res.status(201).json(barber);
  } catch (error) {
    next(error);
  }
});

barbersRouter.put("/barbers/:id", requireAuth, async (req, res, next) => {
  try {
    const barber = await Barber.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name?.trim(),
        specialty: req.body.specialty?.trim(),
        photo: req.body.photo?.trim(),
        bio: req.body.bio?.trim() || "",
        availableTimes: Array.isArray(req.body.availableTimes) ? req.body.availableTimes : []
      },
      { new: true, runValidators: true }
    );

    if (!barber) return res.status(404).json({ error: "Barbeiro não encontrado." });
    res.json(barber);
  } catch (error) {
    next(error);
  }
});
