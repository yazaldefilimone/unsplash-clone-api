import { env } from "@/shared/env";
import mongoose, { mongo } from "mongoose";

export const SettinfMongoConnect = async () => {
  await mongoose.connect(env.mongodb.url);
};
