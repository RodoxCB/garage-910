import { readFile, writeFile } from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";

const CONTENT_FILE = path.join(process.cwd(), "data", "content.json");
const BLOB_PATHNAME = "content/site-content.json";

let defaultContentCache = null;

async function loadDefaultContent() {
  if (defaultContentCache) return defaultContentCache;
  const data = await readFile(CONTENT_FILE, "utf-8");
  defaultContentCache = JSON.parse(data);
  return defaultContentCache;
}

async function readFromBlob() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;

  try {
    const blob = await head(BLOB_PATHNAME, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getContent() {
  const blobContent = await readFromBlob();
  if (blobContent) return blobContent;

  try {
    const data = await readFile(CONTENT_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return loadDefaultContent();
  }
}

export async function saveContent(content) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return content;
  }

  await writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
  return content;
}
