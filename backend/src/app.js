import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { config } from "./config.js";
import { User } from "./models/User.js";
import { Service } from "./models/Service.js";
import { Barber } from "./models/Barber.js";
import { servicesSeed, barbersSeed } from "./seedData.js";
import { authRouter } from "./routes/auth.js";
import { servicesRouter } from "./routes/services.js";
import { barbersRouter } from "./routes/barbers.js";
import { appointmentsRouter } from "./routes/appointments.js";

export const app = express();

app.use(cors({ origin: [config.frontendUrl, "https://royal-barber.vercel.app"], credentials: true }));
app.use(express.json({ limit: "1mb" }));

export async function ensureInitialData() {
  const password = await bcrypt.hash(config.adminPassword, 10);
  await User.findOneAndUpdate(
    { email: config.adminEmail },
    { name: config.adminName, email: config.adminEmail, password, role: "admin" },
    { upsert: true }
  );

  if ((await Service.countDocuments()) === 0) await Service.insertMany(servicesSeed);
  if ((await Barber.countDocuments()) === 0) await Barber.insertMany(barbersSeed);
}

app.get("/", (_req, res) => {
  res.json({ ok: true, name: "Royal Barber API" });
});

app.use(authRouter);
app.use(servicesRouter);
app.use(barbersRouter);
app.use(appointmentsRouter);

app.use((req, res) => {
  res.status(404).json({ error: `Rota ${req.method} ${req.path} não encontrada.` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error.name === "ValidationError" ? 400 : 500;
  res.status(status).json({ error: status === 400 ? error.message : "Erro interno do servidor." });
});
