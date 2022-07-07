import { env } from "@/shared/env";
import mongoose, { mongo } from "mongoose";

const user = "yazalde";
const password = encodeURIComponent("react");
const settings = {
  url: `mongodb+srv://${user}:react@cluster0.duxminp.mongodb.net/?retryWrites=true&w=majority`,
};

export const SettinfMongoConnect = async () => {
  await mongoose.connect(settings.url);
};
