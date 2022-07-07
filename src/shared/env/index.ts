import dotenv from "dotenv";
dotenv.config();
export const env = {
  port: process.env.PORT || 3000,
  mongodb: {
    url: process.env.MONGO as string,
  },
  secret: {
    key: process.env.SECRET as string,
  },
};
