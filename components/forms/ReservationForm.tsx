"use client";

import Link from "next/link";
import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/data/brand";
import { site } from "@/lib/data/site";
import { reservationWhatsAppUrl } from "@/lib/forms/reservation-whatsapp";
import type { ReservationErrors, ReservationPayload } from "@/lib/validations/reservation";

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:border-optic focus:outline-none focus:ring-2 focus:ring-optic/25";

const inputOnPage =
  "border-line/40 bg-paper text-foreground placeholder:text-subtle";

const inputOnLightCard =
  "border-line/40 bg-white text-on-light placeholder:text-smoke";

const inputError = "border-red-400/80 focus:border-red-500 focus:ring-red-500/20";

const labelOnPage = "mb-2 block text-sm font-medium text-foreground";

const labelOnLightCard = "mb-2 block text-sm font-medium text-on-light";

function formDataToPayload(data: FormData): Partial<ReservationPayload> {
  const get = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    preferredDate: get("preferredDate") || undefined,
    preferredTime: get("preferredTime") || undefined,
    message: get("message") || undefined,
  };
}

export function ReservationForm({
  className,
  onLightCard = false,
}: {
  className?: string;
  onLightCard?: boolean;
}) {
  const inputClass = cn(inputBase, onLightCard ? inputOnLightCard : inputOnPage);
  const labelClass = onLightCard ? labelOnLightCard : labelOnPage;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [message, setMessage] = useState("");
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);
  const [lastPayload, setLastPayload] = useState<Partial<ReservationPayload>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");
    setShowWhatsAppFallback(false);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setLastPayload(formDataToPayload(new FormData(form)));

    try {
      const res = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let json: {
        ok?: boolean;
        message?: string;
        errors?: ReservationErrors;
        fallback?: string;
      } = {};

      try {
        json = await res.json();
      } catch {
        setStatus("error");
        setMessage("Respuesta inesperada del servidor. Intenta de nuevo.");
        setShowWhatsAppFallback(true);
        return;
      }

      if (!res.ok) {
        setStatus("error");
        if (json.errors) setErrors(json.errors);
        setMessage(json.message || "Revisa los datos e intenta de nuevo.");
        setShowWhatsAppFallback(json.fallback === "whatsapp");
        return;
      }

      setStatus("success");
      setMessage(
        json.message ||
          "Recibimos tu solicitud. Te contactaremos pronto para confirmar tu cita.",
      );
      form.reset();
      setLastPayload({});
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Verifica tu internet e intenta de nuevo.");
      setShowWhatsAppFallback(true);
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-line bg-paper p-8 text-center md:p-10",
          onLightCard && "border-line/25 bg-white text-on-light",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-optic" aria-hidden />
        <h3
          className={cn(
            "mt-4 font-display text-2xl tracking-[-0.02em]",
            onLightCard ? "text-on-light" : "text-foreground",
          )}
        >
          Solicitud enviada
        </h3>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed",
            onLightCard ? "text-smoke" : "text-muted",
          )}
        >
          {message}
        </p>
        <p
          className={cn(
            "mt-2 text-xs",
            onLightCard ? "text-smoke" : "text-subtle",
          )}
        >
          Si necesitas adelantar la cita, escríbenos por WhatsApp o llama al{" "}
          <a href={`tel:${site.phone}`} className="text-optic underline-offset-4 hover:underline">
            {site.phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-optic underline-offset-4 hover:underline"
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  const whatsappHref = reservationWhatsAppUrl(lastPayload);

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-2xl border border-line bg-paper p-6 shadow-soft md:p-8",
        onLightCard && "border-transparent bg-transparent shadow-none",
        className,
      )}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={120}
          error={errors.name}
          className="sm:col-span-2"
          labelClassName={labelClass}
          inputClassName={inputClass}
        />
        <Field
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={120}
          error={errors.email}
          labelClassName={labelClass}
          inputClassName={inputClass}
        />
        <Field
          label="Teléfono"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="9 1234 5678"
          required
          maxLength={20}
          error={errors.phone}
          labelClassName={labelClass}
          inputClassName={inputClass}
        />
        <Field
          label="Fecha preferida"
          name="preferredDate"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          error={errors.preferredDate}
          labelClassName={labelClass}
          inputClassName={inputClass}
        />
        <SelectField
          label="Horario preferido"
          name="preferredTime"
          labelClassName={labelClass}
          inputClassName={inputClass}
          error={errors.preferredTime}
        />
        <div className="sm:col-span-2">
          <label htmlFor="field-message" className={labelClass}>
            Comentarios{" "}
            <span
              className={cn(
                "font-normal",
                onLightCard ? "text-smoke" : "text-subtle",
              )}
            >
              (opcional)
            </span>
          </label>
          <textarea
            id="field-message"
            name="message"
            rows={3}
            maxLength={500}
            className={cn(inputClass, "resize-none")}
            placeholder="Ej. examen visual, cambio de montura, lentes de contacto…"
          />
        </div>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden
        />
      </div>

      {status === "error" && message ? (
        <div
          className="mt-4 rounded-xl border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200"
          role="alert"
        >
          <p>{message}</p>
          {showWhatsAppFallback ? (
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-optic underline-offset-4 hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Enviar por WhatsApp
              </a>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 font-medium text-optic underline-offset-4 hover:underline"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {site.phoneDisplay}
              </a>
              <Link
                href={`mailto:${brand.email}`}
                className="inline-flex items-center gap-2 font-medium text-optic underline-offset-4 hover:underline"
              >
                {brand.email}
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="btn-cta mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Enviando…
          </>
        ) : (
          <>
            Enviar solicitud
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>

      <p
        className={cn(
          "mt-4 text-xs leading-relaxed",
          onLightCard ? "text-smoke" : "text-subtle",
        )}
      >
        Al enviar aceptas que te contactemos por correo o teléfono para confirmar tu
        cita. También puedes escribirnos a{" "}
        <a
          href={`mailto:${brand.email}`}
          className="text-optic underline-offset-4 hover:underline"
        >
          {brand.email}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  className,
  labelClassName,
  inputClassName,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  className?: string;
  labelClassName: string;
  inputClassName: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const id = `field-${name}`;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={cn(inputClassName, error && inputError)}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  error,
  labelClassName,
  inputClassName,
}: {
  label: string;
  name: string;
  error?: string;
  labelClassName: string;
  inputClassName: string;
}) {
  const id = `field-${name}`;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={cn(inputClassName, error && inputError)}
        defaultValue=""
        aria-invalid={!!error}
        aria-describedby={errorId}
      >
        <option value="">Sin preferencia</option>
        <option value="Mañana (09:30 – 14:30)">Mañana (09:30 – 14:30)</option>
        <option value="Tarde (15:00 – 19:30)">Tarde (15:00 – 19:30)</option>
        <option value="Sábado mañana (10:30 – 14:00)">
          Sábado mañana (10:30 – 14:00)
        </option>
      </select>
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
