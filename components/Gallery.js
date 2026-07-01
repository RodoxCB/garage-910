"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  { id: "all", label: "Todos" },
  { id: "pintura", label: "Pintura" },
  { id: "lanternagem", label: "Lanternagem" },
  { id: "parachoque", label: "Parachoque" },
];

export default function Gallery({ items }) {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <section id="trabalhos" className="relative bg-garage-gray-dark/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="font-display mb-2 text-sm font-medium uppercase tracking-[0.3em] text-garage-yellow">
            Portfólio
          </p>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Trabalhos Realizados
          </h2>
          <div className="mx-auto mt-4 h-px w-24 gold-line" />
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-sm px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === cat.id
                  ? "bg-garage-yellow text-garage-black"
                  : "border border-white/20 text-garage-gray hover:border-garage-yellow hover:text-garage-yellow"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-garage-gray">
            Nenhum trabalho nesta categoria ainda.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-sm border border-white/10 bg-garage-black"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.url.startsWith("data:") ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-garage-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <span className="font-display text-xs font-medium uppercase tracking-wider text-garage-yellow">
                    {categories.find((c) => c.id === item.category)?.label ||
                      item.category}
                  </span>
                  <h3 className="mt-1 font-medium">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
