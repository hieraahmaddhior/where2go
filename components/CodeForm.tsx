"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const ERRORS: Record<number, string> = {
  401: "That code doesn’t match a cafe. Check it and try again.",
  429: "Too many tries. Wait a few minutes, then try again.",
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
      setError(ERRORS[response.status] ?? "Couldn’t open the cafe. Try again.");
    } catch {
      setError("Couldn’t reach where2go. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <h1>Update your cafe’s seats</h1>
      <p className="merchant-sub">Enter the code for your cafe to change how many seats are free.</p>
      <div className="field">
        <label htmlFor="cafe-code">Cafe code</label>
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
          {busy ? "Opening…" : "Open cafe"}
        </button>
      </div>
    </form>
  );
}
