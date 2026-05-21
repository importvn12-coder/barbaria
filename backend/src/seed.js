import bcrypt from "bcryptjs";
import { connectDb } from "./db.js";
import { config } from "./config.js";
import { User } from "./models/User.js";
import { Service } from "./models/Service.js";
import { Barber } from "./models/Barber.js";
import { servicesSeed, barbersSeed } from "./seedData.js";

async function seed() {
  await connectDb();

  const password = await bcrypt.hash(config.adminPassword, 10);
  await User.findOneAndUpdate(
    { email: config.adminEmail },
    { name: config.adminName, email: config.adminEmail, password, role: "admin" },
    { upsert: true, new: true }
  );

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany(servicesSeed);
  }

  if ((await Barber.countDocuments()) === 0) {
    await Barber.insertMany(barbersSeed);
  }

  console.log("Seed concluído.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
