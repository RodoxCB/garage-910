import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "garage910_session";

function createToken(password) {
  return crypto
    .createHmac("sha256", password)
    .update("garage910-admin")
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === createToken(password);
}

export function validatePassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !password) return false;
  return password === adminPassword;
}

export function getSessionCookie(password) {
  return {
    name: SESSION_COOKIE,
    value: createToken(password),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function getLogoutCookie() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  };
}
