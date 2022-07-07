import express from "express";
import helmet from "helmet";
import { userRoutes } from "../routes/user";
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoutes);
export { app };
