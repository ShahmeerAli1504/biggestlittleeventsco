"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

export type FormKind = "event" | "dj" | "contact";

type Props = {
  kind: FormKind;
  title: string;
  sub: string;
  footNote: string;
  submitLabel: string;
  /** Rendered after a successful send. `date` is already formatted for humans. */
  success: (firstName: string, date: string) => ReactNode;
  children: ReactNode;
};

function fmtDate(v: string) {
  if (!v) return "";
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

/** Ordered field list; repeated names (checkbox groups) are joined with ", ". */
function collect(form: HTMLFormElement) {
  const out: { name: string; value: string }[] = [];
  new FormData(form).forEach((raw, name) => {
    if (name === "website") return; // honeypot
    const value = String(raw).trim();
    if (!value) return;
    const existing = out.find((f) => f.name === name);
    if (existing) existing.value += ", " + value;
    else out.push({ name, value });
  });
  return out;
}

function validate(form: HTMLFormElement) {
  let first: HTMLElement | null = null;
  form.querySelectorAll<HTMLElement>(".field").forEach((f) => {
    const input = f.querySelector<HTMLInputElement>("input, select, textarea");
    if (!input) return;
    const bad = !input.checkValidity();
    f.classList.toggle("invalid", bad);
    if (bad && !first) first = input;
  });
  form.querySelectorAll<HTMLElement>("[data-require-one]").forEach((g) => {
    const any = g.querySelectorAll("input:checked").length > 0;
    const err = g.parentElement?.querySelector<HTMLElement>(".group-err");
    if (err) err.style.display = any ? "none" : "block";
    if (!any && !first) first = g.querySelector("input");
  });
  if (first) {
    const el = first as HTMLElement;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  return true;
}

export function LuxForm({ kind, title, sub, footNote, submitLabel, success, children }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState({ name: "", date: "" });

  useEffect(() => {
    startedAt.current = Date.now();
    const form = formRef.current;
    if (!form) return;
    // No past dates.
    const now = new Date();
    const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    form.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((d) => (d.min = iso));
    // Pre-select services from ?service= links (e.g. /contact?service=vip).
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre) form.querySelectorAll<HTMLInputElement>(`input[data-service="${CSS.escape(pre)}"]`).forEach((cb) => (cb.checked = true));
  }, []);

  useEffect(() => {
    if (status === "done") successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status]);

  function onInput(e: FormEvent<HTMLFormElement>) {
    const t = e.target as HTMLInputElement;
    const f = t.closest(".field");
    if (f && t.checkValidity?.()) f.classList.remove("invalid");
    const g = t.closest("[data-require-one]");
    if (g && g.querySelectorAll("input:checked").length) {
      const err = g.parentElement?.querySelector<HTMLElement>(".group-err");
      if (err) err.style.display = "none";
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honey = (form.elements.namedItem("website") as HTMLInputElement | null)?.value;
    if (honey) return;
    if (!validate(form)) return;

    const fields = collect(form);
    const get = (n: string) => fields.find((f) => f.name === n)?.value || "";
    const firstName = get("Full Name").split(" ")[0] || "there";
    const date = fmtDate(get("Event Date"));

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ kind, fields, website: honey || "", elapsedMs: Date.now() - startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !json.ok) throw new Error("send failed");
      setResult({ name: firstName, date: date || "your date" });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form
        ref={formRef}
        className="lux-form"
        noValidate
        onSubmit={onSubmit}
        onInput={onInput}
        onChange={onInput}
        hidden={status === "done"}
      >
        <h3 className="form-title">{title}</h3>
        <p className="form-sub">{sub}</p>
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {children}
        <div className="form-foot">
          <p>{footNote}</p>
          <button className={`btn${status === "sending" ? " loading" : ""}`} type="submit" disabled={status === "sending"}>
            {submitLabel}
          </button>
        </div>
      </form>
      {status === "done" && (
        <div ref={successRef} className="form-success" role="status" aria-live="polite">
          <div className="seal">✦</div>
          {success(result.name, result.date)}
          <div className="divider"><span /><i /><span /></div>
          <p className="text-[.9rem]">
            Want to elevate your head tables to absolute luxury? Ask us about our exclusive <b>VIP Black Table Service</b>.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="form-error" role="alert">
          Something went wrong sending your request. Please try again in a moment, or reach out to us directly by email or Instagram.
        </div>
      )}
    </>
  );
}

/* ---------- Small field helpers ---------- */

export function Legend({ n, children }: { n: string; children: ReactNode }) {
  return (
    <legend>
      <span className="n">{n}</span> {children}
    </legend>
  );
}

export function Check({
  name,
  value,
  title,
  desc,
  service,
  vip,
}: {
  name: string;
  value: string;
  title: ReactNode;
  desc: string;
  service?: string;
  vip?: boolean;
}) {
  return (
    <label className={`check${vip ? " vip-check" : ""}`}>
      <input type="checkbox" name={name} value={value} data-service={service} />
      <span className="box" />
      <span>
        <b>{title}</b>
        <small>{desc}</small>
      </span>
    </label>
  );
}
