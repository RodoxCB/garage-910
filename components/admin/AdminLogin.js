"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      setError("Senha incorreta.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-sm border border-white/10 bg-garage-gray-dark p-8">
        <h1 className="font-serif mb-2 text-2xl font-bold">
          Admin <span className="text-garage-red">910</span>
        </h1>
        <p className="mb-8 text-sm text-garage-gray">
          Acesso restrito para gerenciar o site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-white/20 bg-garage-black px-4 py-3 text-garage-white outline-none focus:border-garage-yellow"
              required
            />
          </div>

          {error && <p className="text-sm text-garage-red">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-garage-yellow py-3 font-display text-sm font-semibold uppercase tracking-wider text-garage-black transition-colors hover:bg-garage-yellow-dark disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
