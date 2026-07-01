import { cookies } from "next/headers";
import { getLogoutCookie } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(getLogoutCookie());
  return Response.json({ success: true });
}
