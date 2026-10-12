"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const ERRORS: Record<number, string> = {
  401: "Kode itu tidak cocok dengan kafe mana pun. Periksa lalu coba lagi.",
  429: "Terlalu banyak percobaan. Tunggu beberapa menit, lalu coba lagi.",
};

export function CodeForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/merchant/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (response.ok) return router.refresh();
      setError(ERRORS[response.status] ?? "Kafe tidak bisa dibuka. Coba lagi.");
    } catch {
      setError("Tidak bisa terhubung ke where2go. Periksa koneksi lalu coba lagi.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <h1>Perbarui meja kafe</h1>
      <p className="merchant-sub">Masukkan kode kafe untuk mengubah meja yang kosong.</p>
      <div className="field">
        <label htmlFor="cafe-code">Kode kafe</label>
        <input
          id="cafe-code"
          className="text-input"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          autoCapitalize="characters"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "cafe-code-error" : undefined}
          required
        />
        {error && (
          <p className="field-error" id="cafe-code-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-primary" disabled={busy || !code.trim()}>
          {busy ? "Membuka…" : "Buka kafe"}
        </button>
      </div>
    </form>
  );
}
