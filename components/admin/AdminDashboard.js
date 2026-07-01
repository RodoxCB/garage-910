"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminDashboard() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setContent)
      .catch(() => router.refresh())
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    setSaving(false);
    setMessage(res.ok ? "Alterações salvas com sucesso!" : "Erro ao salvar.");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", "Novo trabalho");
    formData.append("category", "pintura");

    setSaving(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const updated = await res.json();
      setContent(updated);
      setMessage("Foto adicionada!");
    } else {
      setMessage("Erro ao enviar foto.");
    }
    setSaving(false);
    e.target.value = "";
  }

  async function handleDeleteGalleryItem(id) {
    if (!confirm("Remover esta foto da galeria?")) return;

    setSaving(true);
    const res = await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      const updated = await res.json();
      setContent(updated);
      setMessage("Foto removida.");
    }
    setSaving(false);
  }

  function updateField(section, field, value) {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  function updateService(index, field, value) {
    setContent((prev) => {
      const services = [...prev.services];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  }

  function updateGalleryItem(index, field, value) {
    setContent((prev) => {
      const gallery = [...prev.gallery];
      gallery[index] = { ...gallery[index], [field]: value };
      return { ...prev, gallery };
    });
  }

  if (loading || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-garage-gray">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">
              Painel Admin <span className="text-garage-red">910</span>
            </h1>
            <p className="text-sm text-garage-gray">
              Edite textos e gerencie a galeria de trabalhos.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              className="rounded-sm border border-white/20 px-4 py-2 text-sm hover:border-garage-yellow"
            >
              Ver site
            </a>
            <button
              onClick={handleLogout}
              className="rounded-sm border border-garage-red/50 px-4 py-2 text-sm text-garage-red hover:bg-garage-red/10"
            >
              Sair
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-sm border border-garage-yellow/30 bg-garage-yellow/10 px-4 py-3 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-10">
          <Section title="Hero">
            <Field label="Título" value={content.hero.title} onChange={(v) => updateField("hero", "title", v)} />
            <Field label="Número" value={content.hero.number} onChange={(v) => updateField("hero", "number", v)} />
            <Field label="Subtítulo" value={content.hero.subtitle} onChange={(v) => updateField("hero", "subtitle", v)} />
            <TextArea label="Descrição" value={content.hero.description} onChange={(v) => updateField("hero", "description", v)} />
          </Section>

          <Section title="Sobre">
            <Field label="Título" value={content.about.title} onChange={(v) => updateField("about", "title", v)} />
            <TextArea label="Texto" value={content.about.text} onChange={(v) => updateField("about", "text", v)} />
          </Section>

          <Section title="Serviços">
            {content.services.map((service, i) => (
              <div key={service.id} className="mb-6 rounded-sm border border-white/10 p-4">
                <p className="mb-3 font-display text-sm uppercase tracking-wider text-garage-yellow">
                  {service.id}
                </p>
                <Field label="Título" value={service.title} onChange={(v) => updateService(i, "title", v)} />
                <TextArea label="Descrição" value={service.description} onChange={(v) => updateService(i, "description", v)} />
              </div>
            ))}
          </Section>

          <Section title="Contato">
            <Field label="WhatsApp (com DDI, ex: 5511999999999)" value={content.contact.whatsapp} onChange={(v) => updateField("contact", "whatsapp", v)} />
            <Field label="Mensagem padrão WhatsApp" value={content.contact.whatsappMessage} onChange={(v) => updateField("contact", "whatsappMessage", v)} />
            <Field label="Telefone" value={content.contact.phone} onChange={(v) => updateField("contact", "phone", v)} />
            <Field label="Endereço" value={content.contact.address} onChange={(v) => updateField("contact", "address", v)} />
            <Field label="Horário" value={content.contact.hours} onChange={(v) => updateField("contact", "hours", v)} />
          </Section>

          <Section title="Galeria de Trabalhos">
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Adicionar nova foto
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="block w-full text-sm text-garage-gray file:mr-4 file:rounded-sm file:border-0 file:bg-garage-yellow file:px-4 file:py-2 file:font-display file:text-xs file:font-semibold file:uppercase file:text-garage-black"
              />
            </div>

            <div className="space-y-4">
              {content.gallery.map((item, i) => (
                <div key={item.id} className="flex gap-4 rounded-sm border border-white/10 p-4">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm">
                    {item.url.startsWith("data:") ? (
                      <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <Image src={item.url} alt={item.title} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Field label="Título" value={item.title} onChange={(v) => updateGalleryItem(i, "title", v)} />
                    <div>
                      <label className="mb-1 block text-sm font-medium">Categoria</label>
                      <select
                        value={item.category}
                        onChange={(e) => updateGalleryItem(i, "category", e.target.value)}
                        className="w-full rounded-sm border border-white/20 bg-garage-black px-4 py-2 text-sm outline-none focus:border-garage-yellow"
                      >
                        <option value="pintura">Pintura</option>
                        <option value="lanternagem">Lanternagem</option>
                        <option value="parachoque">Parachoque</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteGalleryItem(item.id)}
                    className="self-start text-sm text-garage-red hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-sm bg-garage-yellow py-4 font-display text-sm font-semibold uppercase tracking-wider text-garage-black transition-colors hover:bg-garage-yellow-dark disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-sm border border-white/10 bg-garage-gray-dark p-6">
      <h2 className="font-display mb-6 text-lg font-semibold uppercase tracking-wide text-garage-yellow">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-white/20 bg-garage-black px-4 py-2 text-sm outline-none focus:border-garage-yellow"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-sm border border-white/20 bg-garage-black px-4 py-2 text-sm outline-none focus:border-garage-yellow"
      />
    </div>
  );
}
