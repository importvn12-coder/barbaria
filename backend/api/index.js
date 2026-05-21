import { app, ensureInitialData } from "../src/app.js";
import { connectDb } from "../src/db.js";

let ready;

async function bootstrap() {
  if (!ready) {
    ready = connectDb().then(ensureInitialData);
  }
  return ready;
}

export default async function handler(req, res) {
  await bootstrap();
  return app(req, res);
}
