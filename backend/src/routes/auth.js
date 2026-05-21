import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { config } from "../config.js";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase() });

    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, config.jwtSecret, {
      expiresIn: "8h"
    });

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
});
