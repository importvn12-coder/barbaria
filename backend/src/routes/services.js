import express from "express";
import { Service } from "../models/Service.js";
import { requireAuth } from "../middleware/auth.js";

export const servicesRouter = express.Router();

function normalizeService(body) {
  return {
    name: body.name?.trim(),
    description: body.description?.trim(),
    price: Number(body.price),
    duration: Number(body.duration),
    image: body.image?.trim(),
    featured: Boolean(body.featured)
  };
}

servicesRouter.get("/services", async (_req, res, next) => {
  try {
    res.json(await Service.find().sort({ featured: -1, name: 1 }));
  } catch (error) {
    next(error);
  }
});

servicesRouter.post("/services", requireAuth, async (req, res, next) => {
  try {
    const service = await Service.create(normalizeService(req.body));
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
});

servicesRouter.put("/services/:id", requireAuth, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, normalizeService(req.body), {
      new: true,
      runValidators: true
    });

    if (!service) return res.status(404).json({ error: "Serviço não encontrado." });
    res.json(service);
  } catch (error) {
    next(error);
  }
});

servicesRouter.delete("/services/:id", requireAuth, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: "Serviço não encontrado." });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
