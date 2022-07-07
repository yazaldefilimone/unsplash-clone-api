import "./settings/alias";

import { env } from "@/shared/env";
import { app } from "./settings/app";
import { SettinfMongoConnect } from "@/main/settings/mongo";

SettinfMongoConnect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(env.port, () => console.log("listening on port " + env.port));
  })
  .catch(() => {
    {
      console.log("Failed to connect to MongoDB");
    }
  });
