import { isAdminAuthenticated } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const content = await getContent();
  return Response.json(content);
}

export async function PUT(request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const content = await request.json();
  await saveContent(content);
  return Response.json(content);
}
