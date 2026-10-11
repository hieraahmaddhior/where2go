"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { clampSeats, formatAge, level, LEVEL_LABEL, type Cafe } from "@/lib/occupancy";

const SYNC_MS = 10000;

type Status = "saved" | "saving" | "failed";
type Change = { delta: number } | { freeSeats: number };

export function SeatUpdater({ initialCafe, initialNow }: { initialCafe: Cafe; initialNow: number }) {
  const router = useRouter();
  const [cafe, setCafe] = useState(initialCafe);
  const [now, setNow] = useState(initialNow);
  const [status, setStatus] = useState<Status>("saved");
  const [exact, setExact] = useState("");
  const pending = useRef(0);

  // Another device at the same counter may be updating too.
  useEffect(() => {
    const timer = setInterval(async () => {
      if (pending.current > 0 || document.visibilityState !== "visible") return;
      try {
        const response = await fetch("/api/merchant/cafe", { cache: "no-store" });
        if (response.status === 401) return router.refresh();
        if (!response.ok) return;
        const data: { cafe: Cafe; now: number } = await response.json();
        if (pending.current === 0) {
          setCafe(data.cafe);
          setNow(data.now);
        }
      } catch {}
    }, SYNC_MS);
    return () => clearInterval(timer);
  }, [router]);

  async function change(next: Change) {
    const previous = cafe;
    const target = "delta" in next ? cafe.freeSeats + next.delta : next.freeSeats;
    setCafe({ ...cafe, freeSeats: clampSeats(target, cafe.totalSeats) });
    setStatus("saving");
    pending.current += 1;
    try {
      const response = await fetch("/api/merchant/cafe", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(next),
      });
      if (response.status === 401) return router.refresh();
      if (!response.ok) throw new Error(String(response.status));
      const data: { cafe: Cafe; now: number } = await response.json();
      pending.current -= 1;
      if (pending.current === 0) {
        setCafe(data.cafe);
        setNow(data.now);
        setStatus("saved");
      }
    } catch {
      pending.current -= 1;
      setCafe(previous);
      setStatus("failed");
    }
  }

  function setExactCount(event: FormEvent) {
    event.preventDefault();
    change({ freeSeats: clampSeats(Number(exact), cafe.totalSeats) });
    setExact("");
  }

  async function switchCafe() {
    await fetch("/api/merchant/session", { method: "DELETE" }).catch(() => {});
    router.refresh();
  }

  const state = level(cafe.freeSeats, cafe.totalSeats);

  return (
    <>
      <h1>{cafe.name}</h1>
      <p className="merchant-sub">{cafe.area}</p>

      <section className="seat-panel" aria-label="Seats free">
        <div className="seat-panel-count">
          <output aria-live="polite">{cafe.freeSeats}</output>
          <span>of {cafe.totalSeats} seats free</span>
        </div>
        <p className="seat-panel-status" role="status">
          {status === "failed" ? (
            <span className="notice-error">Couldn’t save that change. Check your connection and tap again.</span>
          ) : (
            <>
              <span className="status-dot" data-level={state} />
              {LEVEL_LABEL[state]} · {status === "saving" ? "saving…" : `updated ${formatAge(cafe.updatedAt, now)}`}
            </>
          )}
        </p>

        <div className="stepper">
          <button
            className="button button-secondary"
            onClick={() => change({ delta: -1 })}
            disabled={cafe.freeSeats <= 0}
          >
            <StepIcon minus /> Seat taken
          </button>
          <button
            className="button button-primary"
            onClick={() => change({ delta: 1 })}
            disabled={cafe.freeSeats >= cafe.totalSeats}
          >
            <StepIcon /> Seat freed
          </button>
        </div>
        <div className="quick-set">
          <button
            className="button button-secondary"
            onClick={() => change({ freeSeats: 0 })}
            disabled={cafe.freeSeats <= 0}
          >
            Mark full
          </button>
          <button
            className="button button-secondary"
            onClick={() => change({ freeSeats: cafe.totalSeats })}
            disabled={cafe.freeSeats >= cafe.totalSeats}
          >
            Mark all free
          </button>
        </div>
        <form className="exact-set" onSubmit={setExactCount}>
          <label htmlFor="exact-count">Set exact count</label>
          <div>
            <input
              id="exact-count"
              className="text-input"
              type="number"
              inputMode="numeric"
              min={0}
              max={cafe.totalSeats}
              step={1}
              placeholder={`0 to ${cafe.totalSeats}`}
              value={exact}
              onChange={(event) => setExact(event.target.value)}
            />
            <button className="button button-secondary" disabled={exact.trim() === ""}>
              Set
            </button>
          </div>
        </form>
      </section>

      <div className="merchant-foot">
        <span>Customers see this count within seconds.</span>
        <button className="button-text-link" onClick={switchCafe}>
          Switch cafe
        </button>
      </div>
    </>
  );
}

function StepIcon({ minus = false }: { minus?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d={minus ? "M4 9h10" : "M4 9h10M9 4v10"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
