import { put } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";

export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = formData.get("title") || "Novo trabalho";
  const category = formData.get("category") || "pintura";

  if (!file || typeof file === "string") {
    return Response.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  let url;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    url = blob.url;
  } else {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mime = file.type || "image/jpeg";
    url = `data:${mime};base64,${base64}`;
  }

  const content = await getContent();
  const newItem = {
    id: String(Date.now()),
    url,
    title,
    category,
  };

  content.gallery = [newItem, ...content.gallery];
  await saveContent(content);

  return Response.json(content);
}

export async function DELETE(request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await request.json();
  const content = await getContent();
  content.gallery = content.gallery.filter((item) => item.id !== id);
  await saveContent(content);

  return Response.json(content);
}
