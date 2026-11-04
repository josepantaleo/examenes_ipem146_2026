import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import { timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "80kb" }));
app.use("/api/", rateLimit({ windowMs: 60 * 1000, limit: 12, standardHeaders: "draft-7", legacyHeaders: false }));

app.post("/api/teacher/authorize-delete", (req, res) => {
  const configured = process.env.TEACHER_DELETE_PASSWORD;
  const supplied = typeof req.body?.password === "string" ? req.body.password : "";
  if (!configured) return res.status(503).json({ error: "Falta configurar la contraseña docente en el servidor." });
  const a = Buffer.from(supplied);
  const b = Buffer.from(configured);
  const valid = a.length === b.length && timingSafeEqual(a, b);
  if (!valid) return res.status(401).json({ error: "No autorizado." });
  res.json({ authorized: true });
});

app.use(express.static(__dirname));
app.listen(PORT, () => console.log(`Coloquio IPEM 146 disponible en http://localhost:${PORT}`));
