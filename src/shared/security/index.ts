import { env } from "@/shared/env";
import JWT, { VerifyCallback } from "jsonwebtoken";

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, env.secret.key as string, callback);
}
