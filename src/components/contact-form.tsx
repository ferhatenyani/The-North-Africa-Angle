"use client";

import { useState, type FormEvent } from "react";

import type { Dict } from "@/lib/i18n";
import { IconCheck, IconSend, IconSpinner, IconWhatsApp } from "./icons";

const inputClass =
  "w-full border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus:border-cobalt focus:outline-none";

type Status = "idle" | "sending" | "sent" | "error" | "config";

export function ContactForm({
  t,
  waHref,
}: {
  t: Dict["forms"];
  waHref: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});

  // NEXT_PUBLIC_WEB3FORMS_KEY is inlined at build time.
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const fieldErrors: typeof errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) fieldErrors.name = t.requiredMark;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = t.requiredMark;
    if (message.length < 10) fieldErrors.message = t.requiredMark;
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    if (!accessKey) {
      setStatus("config");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New enquiry — thenorthafricangle.com",
          from_name: "The North Africa Angle website",
          name,
          email,
          organisation: String(data.get("organisation") ?? "").trim(),
          countries_themes: String(data.get("countries") ?? "").trim(),
          support_type: String(data.get("support") ?? "").trim(),
          timeframe: String(data.get("timeframe") ?? "").trim(),
          message,
          botcheck: data.get("botcheck") ?? "",
        }),
      });
      const body = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (res.ok && body?.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center border border-hairline bg-white p-8 text-center">
        <span className="grid h-14 w-14 place-items-center border border-cobalt text-cobalt">
          <IconCheck />
        </span>
        <h2 className="mt-5 font-display text-xl font-semibold text-ink">{t.sentTitle}</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">{t.sentBody}</p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-whatsapp px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-whatsapp-dark"
        >
          <IconWhatsApp width="18" height="18" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-hairline bg-white p-6 shadow-[0_20px_48px_-40px_rgba(14,27,44,0.4)] sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink">{t.title}</h2>
      <p className="mt-1.5 text-sm text-ink-muted">{t.responseNote}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label={t.name} required htmlFor="cf-name" error={errors.name}>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label={t.email} required htmlFor="cf-email" error={errors.email}>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </Field>
        <Field label={t.organisation} optionalLabel={`(${t.optional})`} htmlFor="cf-org">
          <input id="cf-org" name="organisation" type="text" autoComplete="organization" className={inputClass} />
        </Field>
        <Field label={t.timeframe} optionalLabel={`(${t.optional})`} htmlFor="cf-time">
          <input id="cf-time" name="timeframe" type="text" placeholder="Q4 2026" className={inputClass} />
        </Field>
        <div className="sm:col-span-2">
          <Field label={t.countries} optionalLabel={`(${t.optional})`} htmlFor="cf-countries">
            <input id="cf-countries" name="countries" type="text" placeholder="Algeria · Tunisia" className={inputClass} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label={t.support} optionalLabel={`(${t.optional})`} htmlFor="cf-support">
            <select id="cf-support" name="support" className={inputClass} defaultValue="">
              <option value="" disabled>
                {t.supportPlaceholder}
              </option>
              {t.supportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label={t.message} required htmlFor="cf-message" error={errors.message}>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              placeholder={t.messagePlaceholder}
              className={`${inputClass} resize-y`}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot — invisible to humans. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-botcheck">Do not fill</label>
        <input id="cf-botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" || status === "config" ? (
        <p role="alert" className="mt-4 border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {status === "config" ? t.errorConfig : t.errorForm}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-cobalt px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cobalt-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <IconSpinner /> : <IconSend />}
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optionalLabel,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {required ? <span className="ml-0.5 text-cobalt">*</span> : null}
        {optionalLabel ? (
          <span className="ml-1.5 font-mono text-[10px] font-normal uppercase tracking-wider text-ink-muted/70">
            {optionalLabel}
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}
