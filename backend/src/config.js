import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/royal-barber",
  jwtSecret: process.env.JWT_SECRET || "royal-barber-dev-secret",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  adminName: process.env.ADMIN_NAME || "Administrador",
  adminEmail: process.env.ADMIN_EMAIL || "admin@royalbarber.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123"
};
