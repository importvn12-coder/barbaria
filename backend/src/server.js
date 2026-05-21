import { connectDb } from "./db.js";
import { config } from "./config.js";
import { app, ensureInitialData } from "./app.js";

connectDb()
  .then(ensureInitialData)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Royal Barber API rodando em http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Falha ao iniciar API:", error);
    process.exit(1);
  });
