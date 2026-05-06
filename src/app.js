import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import swaggerDocument from "./config/swagger.js";
import authRoute from "./routes/authRoute.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import professorRoute from "./routes/professorRoute.js";
import notasRoute from "./routes/notasRoute.js";
import alunoRoute from "./routes/alunosRoute.js";
import turmaRoute from "./routes/turmasRoute.js";
import disciplinaRoute from "./routes/disciplinasRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://sistema-de-escola.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning"
  ]
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Api funcionando" });
});

app.get("/teste", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoutes);
app.use("/professores", professorRoute);
app.use("/notas", notasRoute);
app.use("/alunos", alunoRoute);
app.use("/turmas", turmaRoute);
app.use("/disciplinas", disciplinaRoute);

export default app;