"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReservationErrors } from "@/lib/validations/reservation";

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:border-optic focus:outline-none focus:ring-2 focus:ring-optic/25";

const inputOnPage =
  "border-line/40 bg-paper text-foreground placeholder:text-subtle";

const inputOnLightCard =
  "border-line/40 bg-white text-on-light placeholder:text-smoke";

const labelOnPage = "mb-2 block text-sm font-medium text-foreground";

const labelOnLightCard = "mb-2 block text-sm font-medium text-on-light";

export function ReservationForm({
  className,
  onLightCard = false,
}: {
  className?: string;
  /** Formulario sobre tarjeta clara (sección reservar en home) */
  onLightCard?: boolean;
}) {
  const inputClass = cn(inputBase, onLightCard ? inputOnLightCard : inputOnPage);
  const labelClass = onLightCard ? labelOnLightCard : labelOnPage;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        if (json.errors) setErrors(json.errors);
        setMessage(json.message || "Revisa los datos e intenta de nuevo.");
        return;
      }

      setStatus("success");
      setMessage(json.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Verifica tu internet e intenta de nuevo.");
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
            "mt-3 text-sm",
            onLightCard ? "text-smoke" : "text-muted",
          )}
        >
          {message}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-optic underline-offset-4 hover:underline"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

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
          required
          error={errors.email}
          labelClassName={labelClass}
          inputClassName={inputClass}
        />
        <Field
          label="Teléfono"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="9 1234 5678"
          required
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
        <div>
          <label htmlFor="preferredTime" className={labelClass}>
            Horario preferido
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            className={inputClass}
            defaultValue=""
          >
            <option value="">Sin preferencia</option>
            <option value="Mañana (09:30 – 14:30)">Mañana (09:30 – 14:30)</option>
            <option value="Tarde (15:00 – 19:30)">Tarde (15:00 – 19:30)</option>
            <option value="Sábado mañana (10:30 – 14:00)">
              Sábado mañana (10:30 – 14:00)
            </option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
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
            id="message"
            name="message"
            rows={3}
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
        <p className="mt-4 text-sm text-red-700 dark:text-red-400" role="alert">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
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
          "mt-4 text-xs",
          onLightCard ? "text-smoke" : "text-subtle",
        )}
      >
        Al enviar aceptas que te contactemos por correo o teléfono para confirmar
        tu cita.
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
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={inputClassName}
        aria-invalid={!!error}
        {...props}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
