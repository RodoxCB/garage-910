import { cookies } from "next/headers";
import { getSessionCookie, validatePassword } from "@/lib/auth";

export async function POST(request) {
  const { password } = await request.json();

  if (!validatePassword(password)) {
    return Response.json({ error: "Senha inválida" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookie(password));

  return Response.json({ success: true });
}
