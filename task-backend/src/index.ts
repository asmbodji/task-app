import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
