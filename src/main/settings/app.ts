import express from "express";
import helmet from "helmet";
import { imageRoutes } from "@/main/routes/image";
import { userRoutes } from "@/main/routes/user";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/image", imageRoutes);
export { app };
